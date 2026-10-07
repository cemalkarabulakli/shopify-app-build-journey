import { readFile } from 'node:fs/promises';
import { MerchantCatalog, type Merchant, type MerchantProps, type MerchantRepository } from '$lib/domain/merchant';

/** Adapter: the curated merchant list in `content/merchants.json`, validated on every read. */
export class FileSystemMerchantRepository implements MerchantRepository {
	constructor(private readonly file: string) {}

	async findAll(): Promise<Merchant[]> {
		const raw = JSON.parse(await readFile(this.file, 'utf8')) as MerchantProps[];
		return MerchantCatalog.create(raw);
	}
}
