import { afterEach, describe, expect, it, vi } from 'vitest';
import { createPool } from '../createPool';

const URL = 'postgresql://someone:hunter2@db.example.com:5432/app';

describe('createPool (BUG-002)', () => {
	afterEach(() => vi.restoreAllMocks());

	it('logs a lost idle connection with its context and code, never the connection details', () => {
		const log = vi.spyOn(console, 'error').mockImplementation(() => {});
		const pool = createPool(URL, 3, 'roadmap');
		const err = Object.assign(new Error('terminating connection due to administrator command'), { code: '57P01' });
		expect(() => pool.emit('error', err)).not.toThrow();
		expect(log).toHaveBeenCalledOnce();
		const line = log.mock.calls[0].join(' ');
		expect(line).toContain('[roadmap]');
		expect(line).toContain('57P01');
		expect(line).not.toMatch(/hunter2|someone|db\.example\.com/);
	});

	it('bounds how long a request waits for a connection', () => {
		const timeout = (createPool(URL, 3, 'x') as unknown as { options: { connectionTimeoutMillis: number } }).options.connectionTimeoutMillis;
		expect(timeout).toBe(10_000);
	});
});
