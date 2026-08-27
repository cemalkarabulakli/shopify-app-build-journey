export interface TransactionProps {
	transactionId: string;
	customerId: string | null;
	subscriptionId: string | null;
	status: string;
	total: string | null;
	currencyCode: string | null;
	billedAt: Date | null;
	updatedAt: Date;
}

/** A completed charge — kept for invoices/receipts and for reconciling the money side. */
export class Transaction {
	private constructor(private readonly p: TransactionProps) {}
	static create(p: TransactionProps): Transaction {
		if (!p.transactionId) throw new Error('Transaction needs a transactionId');
		return new Transaction({ ...p });
	}
	get transactionId() { return this.p.transactionId; }
	get customerId() { return this.p.customerId; }
	get subscriptionId() { return this.p.subscriptionId; }
	get status() { return this.p.status; }
	get updatedAt() { return this.p.updatedAt; }
	isNewerThan(other: Transaction | null): boolean {
		return !other || this.updatedAt.getTime() >= other.updatedAt.getTime();
	}
	toJSON(): TransactionProps { return { ...this.p }; }
}
