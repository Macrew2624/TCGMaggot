import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'src', 'data', 'sets');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Accept set ID from command line args, default to base1
const setId = process.argv[2] || 'neo4';
const setDir = path.join(__dirname, 'src', 'data', 'cards', setId);

if (!fs.existsSync(setDir)) {
  console.error(`Set directory not found: ${setDir}`);
  process.exit(1);
}

// Read all PNG files from the set directory
const files = fs.readdirSync(setDir).filter(file => file.endsWith('.png'));

// Generate card data from filenames
const cards = files.map(file => {
  // Remove .png extension
  const id = file.replace('.png', '');

  // Parse filename: base1_001_alakazam_holorare
  const parts = id.split('_');
  const set = parts[0];
  const set_number = parts[1];

  // Extract name (everything between number and rarity)
  const nameParts = parts.slice(2, -1);
  let name = nameParts.join(' ')
    .replace(/'/g, "'")
    .replace(/♂/g, 'M')
    .replace(/♀/g, 'F');

  // Handle filenames with periods in names (e.g., "mr._mime")
  name = name.replace(/\._/g, '.').replace(/mr\./g, 'Mr.');

  // Extract rarity (last part)
  const rarity = parts[parts.length - 1];

  return {
    set: set,
    set_number: set_number,
    name: name,
    rarity: rarity
  };
});

// Sort by set_number
cards.sort((a, b) => {
  const numA = parseInt(a.set_number);
  const numB = parseInt(b.set_number);
  return numA - numB;
});

// Write to JSON file
const outputPath = path.join(outputDir, `${setId}.json`);
fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));

console.log(`Generated ${cards.length} cards for ${setId}`);
console.log(`Output saved to: ${outputPath}`);
