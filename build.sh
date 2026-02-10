#!/bin/bash

# Create a folder for exports
mkdir -p dist/releases

echo "Building for macOS (arm64)..."
bun build ./index.js --compile --target=bun-darwin-arm64 --outfile=dist/releases/qr-app-macos-arm64

echo "Building for macOS (x64)..."
bun build ./index.js --compile --target=bun-darwin-x64 --outfile=dist/releases/qr-app-macos-x64

echo "Building for Windows (x64)..."
bun build ./index.js --compile --target=bun-windows-x64 --outfile=dist/releases/qr-app-windows-x64.exe

echo "Building for Windows (arm64)..."
bun build ./index.js --compile --target=bun-windows-arm64 --outfile=dist/releases/qr-app-windows-arm64.exe

echo "Building for Linux (x64)..."
bun build ./index.js --compile --target=bun-linux-x64 --outfile=dist/releases/qr-app-linux-x64

echo "Building for Linux (arm64)..."
bun build ./index.js --compile --target=bun-linux-arm64 --outfile=dist/releases/qr-app-linux-arm64

echo "Done! Check the 'dist/releases' folder."
