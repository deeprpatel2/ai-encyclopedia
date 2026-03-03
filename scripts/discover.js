#!/usr/bin/env node

/**
 * Discovery tool — finds high-quality external content related to topics in your knowledge base.
 * Only suggests verified, well-regarded sources (repos with 100+ stars, official docs, etc.)
 *
 * Usage:
 *   node scripts/discover.js --topic "ai agents"
 *   node scripts/discover.js --topic "mcp servers" --type github
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

function searchGitHub(query, minStars = 100) {
  console.log(`\n🔍 Searching GitHub for "${query}" (min ${minStars} stars)...\n`);
  try {
    const encoded = encodeURIComponent(`${query} stars:>=${minStars}`);
    const result = execSync(
      `curl -s "https://api.github.com/search/repositories?q=${encoded}&sort=stars&per_page=10"`,
      { encoding: 'utf-8' }
    );
    const data = JSON.parse(result);

    if (!data.items || data.items.length === 0) {
      console.log('  No results found.\n');
      return [];
    }

    // Load existing sources to filter duplicates
    const sources = JSON.parse(readFileSync(SOURCES_FILE, 'utf-8'));
    const existingUrls = new Set(sources.sources.map(s => s.url));

    const results = [];
    for (const repo of data.items) {
      const isDuplicate = existingUrls.has(repo.html_url);
      const status = isDuplicate ? '(already in KB)' : '✨ NEW';
      console.log(`  ${status} ⭐ ${repo.stargazers_count} — ${repo.full_name}`);
      console.log(`    ${repo.description || 'No description'}`);
      console.log(`    ${repo.html_url}\n`);

      if (!isDuplicate) {
        results.push({
          name: repo.full_name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          description: repo.description,
          language: repo.language,
          topics: repo.topics || [],
        });
      }
    }

    return results;
  } catch (e) {
    console.error(`  Error searching GitHub: ${e.message}`);
    return [];
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.topic) {
    console.log(`
Usage: node scripts/discover.js --topic "your topic" [--type github] [--min-stars 100]

Discovers high-quality external content related to your topic.
Only suggests verified sources (repos with 100+ stars, official docs).

Examples:
  node scripts/discover.js --topic "ai agents"
  node scripts/discover.js --topic "mcp servers" --min-stars 500
  node scripts/discover.js --topic "claude code skills"
`);
    process.exit(1);
  }

  const minStars = parseInt(args['min-stars']) || 100;

  console.log(`\n📚 AI Knowledge Base — Content Discovery`);
  console.log(`   Topic: "${args.topic}"`);
  console.log(`   Min Stars: ${minStars}`);

  const results = searchGitHub(args.topic, minStars);

  if (results.length > 0) {
    console.log(`\n💡 To add any of these to your knowledge base:`);
    console.log(`   node scripts/add-source.js --type github-repo --url "<url>" --topics "${args.topic.replace(/\s+/g, ',')}"`);
  }

  console.log(`\n✅ Discovery complete. Found ${results.length} new source(s).`);
}

main();
