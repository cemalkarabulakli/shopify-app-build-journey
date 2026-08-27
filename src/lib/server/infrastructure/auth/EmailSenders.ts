import type { EmailSender } from '$lib/domain/auth';

/** Dev/CI: prints the mail to the server log. */
export class ConsoleEmailSender implements EmailSender {
	async send(to: string, subject: string, text: string) {
		console.log(`\n✉️  [email → ${to}] ${subject}\n${text}\n`);
	}
}

/** Resend (https://resend.com) over plain fetch — no SDK dependency. */
export class ResendEmailSender implements EmailSender {
	constructor(private readonly apiKey: string, private readonly from: string) {}
	async send(to: string, subject: string, text: string) {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ from: this.from, to, subject, text })
		});
		if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
	}
}
