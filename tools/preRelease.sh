#!/bin/bash

# Base directory
BASE_DIR="./packages"

# Check if the directory exists
if [ ! -d "$BASE_DIR" ]; then
  echo "Error: Directory $BASE_DIR not found."
  exit 1
fi

# Traverse all subdirectories
echo "Cleaning lock files and node_modules directories in $BASE_DIR..."

find "$BASE_DIR" -type f \( \
    -name "package-lock.json" -o \
    -name "pnpm-lock.yaml" -o \
    -name "yarn.lock" \) -exec rm -f {} +

find "$BASE_DIR" -type d -name "node_modules" -exec rm -rf {} +

echo "Cleanup completed."
