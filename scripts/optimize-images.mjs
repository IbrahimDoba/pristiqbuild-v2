import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

// Image quality settings
const QUALITY_SETTINGS = {
  jpeg: { quality: 85, progressive: true },
  webp: { quality: 85, effort: 6 },
  png: { quality: 85, compressionLevel: 9 },
};

// Track statistics
const stats = {
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  filesProcessed: 0,
  errors: 0,
};

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
  console.log('✅ Created optimized directory');
}

// Get all image files recursively
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip optimized directory
    if (filePath.includes('optimized')) {
      return;
    }

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else if (/\.(jpe?g|png|webp)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(publicDir, inputPath);
    const parsedPath = path.parse(relativePath);
    const outputDir = path.join(optimizedDir, parsedPath.dir);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPathWebP = path.join(
      outputDir,
      `${parsedPath.name}.webp`
    );
    const outputPathOptimized = path.join(
      outputDir,
      `${parsedPath.name}${parsedPath.ext}`
    );

    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    stats.totalOriginalSize += originalSize;

    // Load image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Convert to WebP (best compression)
    await image
      .webp(QUALITY_SETTINGS.webp)
      .toFile(outputPathWebP);

    // Also create optimized version in original format (fallback)
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      await sharp(inputPath)
        .jpeg(QUALITY_SETTINGS.jpeg)
        .toFile(outputPathOptimized);
    } else if (metadata.format === 'png') {
      await sharp(inputPath)
        .png(QUALITY_SETTINGS.png)
        .toFile(outputPathOptimized);
    }

    // Get optimized file sizes
    const webpSize = fs.statSync(outputPathWebP).size;
    const optimizedSize = fs.existsSync(outputPathOptimized)
      ? fs.statSync(outputPathOptimized).size
      : webpSize;

    stats.totalOptimizedSize += Math.min(webpSize, optimizedSize);
    stats.filesProcessed++;

    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(
      `✅ ${relativePath} | ${(originalSize / 1024).toFixed(0)}KB → ${(webpSize / 1024).toFixed(0)}KB (${savings}% saved)`
    );
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

// Main function
async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');

  const imageFiles = getImageFiles(publicDir);
  console.log(`📁 Found ${imageFiles.length} images to optimize\n`);

  // Process images in batches to avoid memory issues
  const batchSize = 5;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    await Promise.all(batch.map(optimizeImage));
  }

  // Print summary
  console.log('\n📊 Optimization Complete!');
  console.log('═══════════════════════════════════');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Errors: ${stats.errors}`);
  console.log(
    `Original size: ${(stats.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Optimized size: ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Total saved: ${(
      (1 - stats.totalOptimizedSize / stats.totalOriginalSize) *
      100
    ).toFixed(1)}%`
  );
  console.log('═══════════════════════════════════\n');
  console.log('✨ Optimized images are in /public/optimized/');
  console.log('💡 Update your image imports to use the optimized versions!');
}

// Run optimization
optimizeAllImages().catch(console.error);
