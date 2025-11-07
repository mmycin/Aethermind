#!/bin/sh
set -e

echo "Generating Types for Python from Protobuf"
protoc --python_out=. ai/schema/schema.proto

echo "Generating Types for TypeScript from Protobuf"

# Detect OS
OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')

if echo "$OS_TYPE" | grep -q "mingw\|cygwin\|msys"; then
    # Windows: use .exe
    PROTOC_PLUGIN="./node_modules/.bin/protoc-gen-ts.exe"
else
    # Linux/macOS: use normal plugin name
    PROTOC_PLUGIN="protoc-gen-ts"
fi

protoc \
  --plugin="protoc-gen-ts=$PROTOC_PLUGIN" \
  --ts_out="." \
  --ts_opt=esModuleInterop=true \
  ./app/src/schema/schema.proto

echo "✅ Protobuf generation complete."
