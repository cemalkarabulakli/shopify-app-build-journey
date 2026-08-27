export interface CustomerProps {
	customerId: string;
	email: string;
	name: string | null;
	updatedAt: Date;
}

/** A paying (or once-paying) person, keyed by the provider's customer id. */
export class Customer {
	private constructor(private readonly p: CustomerProps) {}
	static create(p: CustomerProps): Customer {
		if (!p.customerId) throw new Error('Customer needs a customerId');
		if (!p.email) throw new Error(`Customer ${p.customerId} needs an email`);
		return new Customer({ ...p, email: p.email.trim().toLowerCase() });
	}
	get customerId() { return this.p.customerId; }
	get email() { return this.p.email; }
	get name() { return this.p.name; }
	get updatedAt() { return this.p.updatedAt; }
	isNewerThan(other: Customer | null): boolean {
		return !other || this.updatedAt.getTime() >= other.updatedAt.getTime();
	}
	toJSON(): CustomerProps { return { ...this.p }; }
}
