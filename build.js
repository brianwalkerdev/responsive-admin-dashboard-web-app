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
const cssDir = path.join(distDir, 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}
fs.readdirSync(path.join(__dirname, 'css')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'css', file),
    path.join(cssDir, file)
  );
});
console.log('✓ Copied CSS files');

// Copy JS directory
const jsDir = path.join(distDir, 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}
fs.readdirSync(path.join(__dirname, 'js')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'js', file),
    path.join(jsDir, file)
  );
});
console.log('✓ Copied JavaScript files');

// Copy images directory
const imagesDir = path.join(distDir, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
fs.readdirSync(path.join(__dirname, 'images')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'images', file),
    path.join(imagesDir, file)
  );
});
console.log('✓ Copied image files');

// Copy svgs directory
const svgsDir = path.join(distDir, 'svgs');
if (!fs.existsSync(svgsDir)) {
  fs.mkdirSync(svgsDir, { recursive: true });
}
fs.readdirSync(path.join(__dirname, 'svgs')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'svgs', file),
    path.join(svgsDir, file)
  );
});
console.log('✓ Copied SVG files');

console.log('\n✨ Build complete! Files are ready in the dist/ directory');
console.log('📦 You can now deploy the dist/ directory to your hosting service\n');
