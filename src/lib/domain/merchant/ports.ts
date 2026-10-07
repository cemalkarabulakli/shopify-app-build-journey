import type { Merchant } from './Merchant';

/** Port: where the curated merchant list comes from. */
export interface MerchantRepository {
	/** In curated order. */
	findAll(): Promise<Merchant[]>;
}
