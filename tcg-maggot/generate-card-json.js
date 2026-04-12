import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseSetDir = path.join(__dirname, 'src', 'data', 'cards', 'base1');
const outputDir = path.join(__dirname, 'src', 'data', 'sets');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all PNG files from the base1 directory
const files = fs.readdirSync(baseSetDir).filter(file => file.endsWith('.png'));

// Generate card data from filenames
const cards = files.map(file => {
  // Remove .png extension
  const id = file.replace('.png', '');

  // Parse filename: base1_001_alakazam_holorare
  const parts = id.split('_');
  const set = parts[0]; // base1
  const set_number = parts[1]; // 001
  
  // Extract name (everything between number and rarity)
  const nameParts = parts.slice(2, -1);
  let name = nameParts.join(' ')
    .replace(/'/g, "'")
    .replace(/\b\w/g, c => c.toUpperCase());
  
  // Extract rarity (last part)
  const rarity = parts[parts.length - 1];

  // Handle special cases
  if (name === 'Nidoran M') name = 'Nidoran ♂';

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
const outputPath = path.join(outputDir, 'base1.json');
fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));

console.log(`Generated ${cards.length} cards for Base Set`);
console.log(`Output saved to: ${outputPath}`);
