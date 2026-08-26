import { getContext, setContext } from 'svelte';
import { en, type Messages } from './en';
import { tr } from './tr';

export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const messages: Record<Locale, Messages> = { en, tr };

export const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

const KEY = Symbol('i18n');
export const setI18n = (locale: Locale) => setContext(KEY, { locale, t: messages[locale] });
export const useI18n = () => getContext<{ locale: Locale; t: Messages }>(KEY);
export type { Messages };
