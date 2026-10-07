/**
 * Port: "is this person a paying member, and on which tier?"
 *
 * The roadmap only needs this one answer, so it depends on this instead of the whole
 * billing domain. Wiring it to Paddle (or to a fake, in tests) happens in the container.
 */
export interface MembershipCheck {
	isMember(email: string): Promise<{ member: boolean; tier: string | null }>;
}
