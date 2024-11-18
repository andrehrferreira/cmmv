#!/bin/bash

for dir in ./packages/*; do
  package_name=$(basename "$dir")
  
  if [ -d "./node_modules/@cmmv/$package_name" ]; then
    echo "Removing ./node_modules/@cmmv/$package_name"
    rm -rf "./node_modules/@cmmv/$package_name"
  fi
done
