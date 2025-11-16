#!/usr/bin/env node

/**
 * Build script for static file deployment
 * This script prepares the project for deployment to static hosting services
 * like Netlify, GitHub Pages, Vercel, etc.
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Building project for static deployment...\n');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('✓ Created dist directory');
}

// Copy index.html
fs.copyFileSync(
  path.join(__dirname, 'index.html'),
  path.join(distDir, 'index.html')
);
console.log('✓ Copied index.html');

// Copy CSS directory
const cssSourceDir = path.join(__dirname, 'css');
if (fs.existsSync(cssSourceDir)) {
  const cssDir = path.join(distDir, 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  fs.readdirSync(cssSourceDir).forEach(file => {
    fs.copyFileSync(
      path.join(cssSourceDir, file),
      path.join(cssDir, file)
    );
  });
  console.log('✓ Copied CSS files');
} else {
  console.warn('⚠ CSS directory not found, skipping...');
}

// Copy JS directory
const jsSourceDir = path.join(__dirname, 'js');
if (fs.existsSync(jsSourceDir)) {
  const jsDir = path.join(distDir, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  fs.readdirSync(jsSourceDir).forEach(file => {
    fs.copyFileSync(
      path.join(jsSourceDir, file),
      path.join(jsDir, file)
    );
  });
  console.log('✓ Copied JavaScript files');
} else {
  console.warn('⚠ JS directory not found, skipping...');
}

// Copy images directory
const imagesSourceDir = path.join(__dirname, 'images');
if (fs.existsSync(imagesSourceDir)) {
  const imagesDir = path.join(distDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  fs.readdirSync(imagesSourceDir).forEach(file => {
    fs.copyFileSync(
      path.join(imagesSourceDir, file),
      path.join(imagesDir, file)
    );
  });
  console.log('✓ Copied image files');
} else {
  console.warn('⚠ Images directory not found, skipping...');
}

// Copy svgs directory
const svgsSourceDir = path.join(__dirname, 'svgs');
if (fs.existsSync(svgsSourceDir)) {
  const svgsDir = path.join(distDir, 'svgs');
  if (!fs.existsSync(svgsDir)) {
    fs.mkdirSync(svgsDir, { recursive: true });
  }
  fs.readdirSync(svgsSourceDir).forEach(file => {
    fs.copyFileSync(
      path.join(svgsSourceDir, file),
      path.join(svgsDir, file)
    );
  });
  console.log('✓ Copied SVG files');
} else {
  console.warn('⚠ SVGS directory not found, skipping...');
}

console.log('\n✨ Build complete! Files are ready in the dist/ directory');
console.log('📦 You can now deploy the dist/ directory to your hosting service\n');
