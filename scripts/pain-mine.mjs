#!/usr/bin/env node
/**
 * Pain mining: turns saved App Store reviews into a ranked list of merchant pains.
 *   node scripts/pain-mine.mjs [outreach/prospects.csv]
 *
 * Reads the CSV written by parse-reviews.mjs and prints, for each pain category:
 * how often it appears overall, how often in the last two years (the signal that
 * still matters), which pains travel together, and every review that quotes a number.
 * The whole point is to rank by *recent* volume, not by lifetime volume.
 */
import { readFile } from 'node:fs/promises';

const file = process.argv[2] ?? 'outreach/prospects.csv';
const RECENT_FROM = new Date().getFullYear() - 2; // "recent" = this year and the two before it

/** One regex per pain. Deliberately broad: a miss costs more than a false positive here. */
const PAINS = {
	'fees / price rises': /price|pricing|fee|expensive|cost|charg(ed|es) (us|me)|\$\d|percent|%|raised|increase/,
	'support unresponsive': /support|respons|reply|answer|bot|nobody|no one|ticket|help/,
	'bugs / downtime': /bug|crash|broke|not work|doesn.t work|stopped|blank|glitch|slow|down/,
	'setup complexity': /setup|set up|complicated|complex|confus|onboard|install|documentation/,
	'lock-in / migration': /migrat|move|switch|lock|export|transfer|stuck|leave/,
	'portal / checkout': /checkout|portal|customer (can.t|cannot|couldn)|widget|theme/,
	'cancel / pause fails': /unsubscribe|cancel|pause|skip|keep(s)? (being )?charg/
};

const parse = (csv) => {
	const rows = [];
	const lines = csv.split('\n');
	const head = split(lines[0]);
	for (const line of lines.slice(1)) {
		if (!line.trim()) continue;
		const cells = split(line);
		rows.push(Object.fromEntries(head.map((h, i) => [h, cells[i] ?? ''])));
	}
	return rows;
};

/** Minimal RFC-4180 splitter: quoted cells, "" escapes. */
function split(line) {
	const out = [];
	let cur = '';
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		const c = line[i];
		if (quoted) {
			if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
			else if (c === '"') quoted = false;
			else cur += c;
		} else if (c === '"') quoted = true;
		else if (c === ',') { out.push(cur); cur = ''; }
		else cur += c;
	}
	out.push(cur);
	return out;
}

const tagsOf = (text) => Object.entries(PAINS).filter(([, re]) => re.test(text.toLowerCase())).map(([k]) => k);
const yearOf = (row) => Number(row.date?.slice(-4)) || 0;
const bar = (n, max) => '█'.repeat(Math.max(1, Math.round((n / max) * 28)));

const rows = parse(await readFile(file, 'utf8'));
const recent = rows.filter((r) => yearOf(r) >= RECENT_FROM);

const count = (set) => {
	const c = new Map(Object.keys(PAINS).map((k) => [k, 0]));
	for (const r of set) for (const t of tagsOf(r.review_excerpt)) c.set(t, c.get(t) + 1);
	return c;
};
const all = count(rows);
const now = count(recent);
const max = Math.max(...now.values(), 1);

console.log(`\n${rows.length} reviews (${recent.length} from ${RECENT_FROM} onwards) · ${file}\n`);
console.log('PAIN                      RECENT   ALL   share of recent');
for (const [pain, n] of [...now.entries()].sort((a, b) => b[1] - a[1])) {
	const pct = recent.length ? Math.round((n / recent.length) * 100) : 0;
	console.log(`${pain.padEnd(24)} ${String(n).padStart(5)} ${String(all.get(pain)).padStart(5)}   ${bar(n, max)} ${pct}%`);
}

const pairs = new Map();
for (const r of rows) {
	const t = tagsOf(r.review_excerpt).sort();
	for (let i = 0; i < t.length; i++)
		for (let j = i + 1; j < t.length; j++) {
			const k = `${t[i]} + ${t[j]}`;
			pairs.set(k, (pairs.get(k) ?? 0) + 1);
		}
}
console.log('\nPAINS THAT TRAVEL TOGETHER (the real story is usually a pair)');
for (const [k, v] of [...pairs].sort((a, b) => b[1] - a[1]).slice(0, 5)) console.log(`  ${String(v).padStart(3)}  ${k}`);

const NUM = /\$[\d,]{2,}|\d+(\.\d+)?\s?%/;
const quoted = rows.filter((r) => NUM.test(r.review_excerpt));
console.log(`\nREVIEWS QUOTING A NUMBER (${quoted.length}) — these are your first calls`);
for (const r of quoted) {
	const m = r.review_excerpt.match(new RegExp(`.{0,55}(${NUM.source}).{0,55}`));
	console.log(`  · ${r.store} (${r.country}, ${r.time_using})\n    …${m?.[0].trim()}…`);
}
console.log('');
