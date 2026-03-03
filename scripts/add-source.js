#!/usr/bin/env node

/**
 * CLI tool to add new sources to the knowledge base.
 *
 * Usage:
 *   node scripts/add-source.js --type github-repo --url "https://github.com/owner/repo" --topics "ai,agents"
 *   node scripts/add-source.js --type article --url "https://example.com/post" --topics "llm,tutorial" --title "My Article"
 *   node scripts/add-source.js --type youtube --url "https://youtube.com/watch?v=xxx" --topics "demo,ai"
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCES_FILE = join(ROOT, 'sources.json');

function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      parsed[key] = args[i + 1] || true;
      i++;
    }
  }
  return parsed;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

function generateId(url, type) {
  try {
    const u = new URL(url);
    if (type === 'github-repo') {
      return slugify(u.pathname.split('/').filter(Boolean).join('-'));
    }
    if (type === 'youtube') {
      const videoId = u.searchParams.get('v') || u.pathname.split('/').pop();
      return slugify(`yt-${videoId}`);
    }
    return slugify(u.hostname.replace('www.', '') + '-' + u.pathname);
  } catch {
    return slugify(url);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.type || !args.url) {
    console.log(`
Usage: node scripts/add-source.js --type <type> --url <url> --topics <topics> [--title <title>] [--notes <notes>]

Types: github-repo, article, youtube, startup, tool, paper

Examples:
  node scripts/add-source.js --type github-repo --url "https://github.com/owner/repo" --topics "ai,agents"
  node scripts/add-source.js --type article --url "https://example.com/post" --topics "llm" --title "My Article"
  node scripts/add-source.js --type youtube --url "https://youtube.com/watch?v=xxx" --topics "demo"
`);
    process.exit(1);
  }

  const validTypes = ['github-repo', 'article', 'youtube', 'startup', 'tool', 'paper'];
  if (!validTypes.includes(args.type)) {
    console.error(`Invalid type "${args.type}". Valid: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  const sources = JSON.parse(readFileSync(SOURCES_FILE, 'utf-8'));
  const id = args.id || generateId(args.url, args.type);

  if (sources.sources.find(s => s.id === id)) {
    console.error(`Source "${id}" already exists. Use a different --id or URL.`);
    process.exit(1);
  }

  const topics = args.topics ? args.topics.split(',').map(t => t.trim()) : [];
  const today = new Date().toISOString().split('T')[0];

  const newSource = {
    id,
    type: args.type,
    url: args.url,
    title: args.title || '',
    description: args.description || '',
    topics,
    added: today,
    status: 'pending',
    notes: args.notes || ''
  };

  sources.sources.push(newSource);
  sources.lastUpdated = today;

  writeFileSync(SOURCES_FILE, JSON.stringify(sources, null, 2) + '\n');
  console.log(`Added source: ${id}`);
  console.log(`  Type: ${args.type}`);
  console.log(`  URL: ${args.url}`);
  console.log(`  Topics: ${topics.join(', ')}`);
  console.log(`\nRun "node scripts/process-sources.js --id ${id}" to process it.`);
}

main();
