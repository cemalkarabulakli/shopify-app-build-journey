import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { VipMember, type VipMemberProps, type VipMemberRepository } from '$lib/domain/vip';

/**
 * Adapter: one JSON file, keyed by subscription id. Enough for the first hundred
 * members; swap for a database behind the same port when it isn't.
 */
export class FileVipMemberRepository implements VipMemberRepository {
	private queue: Promise<unknown> = Promise.resolve();

	constructor(private readonly file: string) {}

	async findBySubscriptionId(id: string): Promise<VipMember | null> {
		return (await this.read())[id] ?? null;
	}

	async findAll(): Promise<VipMember[]> {
		return Object.values(await this.read());
	}

	save(member: VipMember): Promise<void> {
		// Serialise writes so concurrent webhooks can't clobber each other.
		const run = this.queue.then(async () => {
			const all = await this.read();
			all[member.subscriptionId] = member;
			await mkdir(dirname(this.file), { recursive: true });
			const json = Object.fromEntries(Object.entries(all).map(([k, m]) => [k, m.toJSON()]));
			await writeFile(this.file, JSON.stringify(json, null, 2));
		});
		this.queue = run.catch(() => {});
		return run;
	}

	private async read(): Promise<Record<string, VipMember>> {
		let raw: string;
		try {
			raw = await readFile(this.file, 'utf8');
		} catch {
			return {};
		}
		const parsed = JSON.parse(raw) as Record<string, VipMemberProps & { updatedAt: string }>;
		return Object.fromEntries(
			Object.entries(parsed).map(([k, p]) => [k, VipMember.create({ ...p, updatedAt: new Date(p.updatedAt) })])
		);
	}
}
