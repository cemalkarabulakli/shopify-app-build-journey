import type { Post } from './Post';

/**
 * Port (Dependency Inversion): the application layer depends on this
 * abstraction, never on a concrete data source.
 */
export interface PostRepository {
	findAll(): Promise<Post[]>;
	findBySlug(slug: string): Promise<Post | null>;
}
