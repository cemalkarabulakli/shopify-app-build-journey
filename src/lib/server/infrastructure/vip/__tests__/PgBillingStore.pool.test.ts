import type { EventEmitter } from 'node:events';
import { describe, expect, it } from 'vitest';
import { PgBillingStore } from '../PgBillingStore';

/**
 * BUG-002 reproduction: when Postgres drops an idle connection (Neon scale-to-zero, an admin
 * terminate, a network blip), pg emits 'error' on the pool. With no listener, Node treats it as an
 * unhandled 'error' event and the whole site goes down — observed in VERIFY 0003.
 */
describe('PgBillingStore connection pool (BUG-002)', () => {
	const poolOf = (store: PgBillingStore) => (store as unknown as { pool: EventEmitter & { options: { connectionTimeoutMillis?: number } } }).pool;

	it('survives an idle connection being terminated instead of crashing the process', () => {
		const pool = poolOf(new PgBillingStore('postgresql://u:p@127.0.0.1:1/db'));
		expect(() => pool.emit('error', new Error('terminating connection due to administrator command'))).not.toThrow();
	});

	it('gives up connecting after a bounded time instead of hanging requests', () => {
		const timeout = poolOf(new PgBillingStore('postgresql://u:p@127.0.0.1:1/db')).options.connectionTimeoutMillis ?? 0;
		expect(timeout).toBeGreaterThan(0);
		expect(timeout).toBeLessThanOrEqual(10_000);
	});
});
