#!/bin/bash

# Script to create necessary volume directories for Supabase self-hosted setup

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SUPABASE_DIR="$PROJECT_ROOT/supabase-selfhost"

echo "Creating Supabase volume directories..."

# Create volume directories
mkdir -p "$SUPABASE_DIR/volumes/db/data"
mkdir -p "$SUPABASE_DIR/volumes/storage"
mkdir -p "$SUPABASE_DIR/volumes/functions"
mkdir -p "$SUPABASE_DIR/volumes/logs"
mkdir -p "$SUPABASE_DIR/volumes/pooler"
mkdir -p "$SUPABASE_DIR/volumes/api"

# Create supabase CLI temp directory
mkdir -p "$PROJECT_ROOT/supabase/.temp"

echo "✅ Volume directories created successfully!"
echo ""
echo "Note: Some directories (like volumes/db/data and volumes/storage) are in .gitignore"
echo "      and will be created automatically by Docker if they don't exist."

