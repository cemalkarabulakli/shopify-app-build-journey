import type { Customer } from './Customer';
import type { Subscription } from './Subscription';
import type { Transaction } from './Transaction';

export interface CustomerRepository {
	findById(id: string): Promise<Customer | null>;
	findByEmail(email: string): Promise<Customer | null>;
	save(customer: Customer): Promise<void>;
}
export interface SubscriptionRepository {
	findById(id: string): Promise<Subscription | null>;
	findByCustomer(customerId: string): Promise<Subscription[]>;
	save(subscription: Subscription): Promise<void>;
}
export interface TransactionRepository {
	findById(id: string): Promise<Transaction | null>;
	save(transaction: Transaction): Promise<void>;
}
/** Remembers processed provider event ids so at-least-once delivery becomes exactly-once processing. */
export interface ProcessedEventLog {
	/** @returns true if this is the first time we see the id (and it is now recorded). */
	recordIfNew(eventId: string, eventType: string, occurredAt: Date): Promise<boolean>;
}
