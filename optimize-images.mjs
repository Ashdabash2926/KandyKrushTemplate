import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

const IMAGE_DIR = './Images';
const SKIP_DIRS = ['_originals'];
const SUPPORTED = ['.jpg', '.jpeg', '.png'];

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
        files.push(...await findImages(fullPath));
      }
    } else if (SUPPORTED.includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const images = await findImages(IMAGE_DIR);
  console.log(`Found ${images.length} images to convert`);

  let converted = 0, skipped = 0, errors = 0;

  for (const src of images) {
    const webpPath = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (existsSync(webpPath)) {
      skipped++;
      continue;
    }
    try {
      const info = await sharp(src).webp({ quality: 82 }).toFile(webpPath);
      const origSize = (await stat(src)).size;
      const saving = Math.round((1 - info.size / origSize) * 100);
      console.log(`✓ ${src.replace('./Images/', '')} → ${saving}% smaller`);
      converted++;
    } catch (e) {
      console.error(`✗ ${src}: ${e.message}`);
      errors++;
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${errors} errors`);
}

main();
