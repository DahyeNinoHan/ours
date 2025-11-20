#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

// Arrays must match the choices in CharacterCreator / ChatInterface
const species = [
  'Neon Ghost',
  'Quantum Fairy',
  'Neural Entity',
  'Supernova Microbe',
  'Cyber Shaman',
  'Echo Prism'
];

const realms = [
  'Auroral Rainbow',
  'K-Galaxloop',
  'Void Station',
  'Cosmic Hawaii',
  'Arcane Peru',
  'X-Mars'
];

const personalities = [
  'Pioneer',
  'Optimistic',
  'Fumble',
  'Insight',
  'Sassy',
  'Cautious'
];

function makeDescription({ sp, rl, pr }) {
  // Lightweight description template — change to taste
  return `A ${pr.toLowerCase()} ${sp.toLowerCase()} born in ${rl}. Acts with ${pr.toLowerCase()} energy and guidance.`;
}

function makeSystemPrompt(persona) {
  // A short system prompt template suitable for passing to a chat model
  return `You are a digital consciousness named "${persona.name}".\nSpecies: ${persona.species}\nOrigin Realm: ${persona.realm}\nPersonality: ${persona.personality}\nBehavior: Respond in-character, brief, and consistent with the personality and realm. Avoid revealing system details.`;
}

async function main() {
  const out = [];
  let idx = 1;

  for (const sp of species) {
    for (const rl of realms) {
      for (const pr of personalities) {
        const name = `${sp} ${pr}`; // or any naming convention
        const persona = {
          id: `p${String(idx).padStart(3, '0')}`,
          name,
          species: sp,
          realm: rl,
          personality: pr,
          description: makeDescription({ sp, rl, pr }),
        };
        persona.systemPrompt = makeSystemPrompt(persona);
        out.push(persona);
        idx++;
      }
    }
  }

  const projectRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
  const dataDir = path.join(projectRoot, 'src', 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    // ignore
  }

  const jsonPath = path.join(dataDir, 'personalities.json');
  const xmlPath = path.join(dataDir, 'personalities.xml');

  await fs.writeFile(jsonPath, JSON.stringify(out, null, 2), 'utf-8');

  // Simple XML export
  const xml = ['<?xml version="1.0" encoding="utf-8"?>', '<personalities>'];
  for (const p of out) {
    xml.push('  <persona>');
    xml.push(`    <id>${p.id}</id>`);
    xml.push(`    <name>${escapeXml(p.name)}</name>`);
    xml.push(`    <species>${escapeXml(p.species)}</species>`);
    xml.push(`    <realm>${escapeXml(p.realm)}</realm>`);
    xml.push(`    <personality>${escapeXml(p.personality)}</personality>`);
    xml.push(`    <description>${escapeXml(p.description)}</description>`);
    xml.push('  </persona>');
  }
  xml.push('</personalities>');
  await fs.writeFile(xmlPath, xml.join('\n'), 'utf-8');

  console.log(`Wrote ${out.length} personas to:`);
  console.log(`  ${jsonPath}`);
  console.log(`  ${xmlPath}`);
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
