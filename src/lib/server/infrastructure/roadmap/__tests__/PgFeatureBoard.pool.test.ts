import type { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import { PgFeatureBoard } from '../PgFeatureBoard';

/** VERIFY 0003 (m-6) crashed the server through this pool; it must behave like every other (BUG-002). */
describe('PgFeatureBoard connection pool', () => {
	const poolOf = (b: PgFeatureBoard) => (b as unknown as { pool: EventEmitter & { options: { connectionTimeoutMillis?: number } } }).pool;

	it('survives an idle connection being terminated and logs it as [roadmap]', () => {
		const log = vi.spyOn(console, 'error').mockImplementation(() => {});
		const pool = poolOf(new PgFeatureBoard('postgresql://u:p@127.0.0.1:1/db'));
		expect(() => pool.emit('error', new Error('terminating connection due to administrator command'))).not.toThrow();
		expect(log.mock.calls[0][0]).toContain('[roadmap]');
		log.mockRestore();
	});

	it('bounds how long a request waits for a connection', () => {
		expect(poolOf(new PgFeatureBoard('postgresql://u:p@127.0.0.1:1/db')).options.connectionTimeoutMillis).toBe(10_000);
	});
});
