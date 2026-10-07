import pg from 'pg';

/**
 * Every Postgres pool goes through here (BUG-002). An idle client can die under us — Neon scaling
 * to zero, an admin terminate, a network blip — and pg reports that as an 'error' event on the pool;
 * unhandled, Node kills the whole process. The next query simply opens a fresh connection, so
 * logging is all the handling it needs. Connecting gives up after 10 s (headroom for a Neon cold
 * start) so a dead database fails the request that needs it instead of holding it for the OS TCP
 * timeout (~75 s).
 */
export function createPool(connectionString: string, max: number, context: string): pg.Pool {
	const pool = new pg.Pool({ connectionString, max, connectionTimeoutMillis: 10_000 });
	// Message and SQLSTATE only: the error object can carry host and user details.
	pool.on('error', (e) => console.error(`[${context}] idle database connection lost:`, (e as { code?: string }).code ?? '-', e.message));
	return pool;
}
