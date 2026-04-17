#!/bin/bash

# ============================================
# CLEAN & RESET VS CODE ERRORS
# ============================================

echo "🧹 Cleaning VS Code cache and TypeScript errors..."
echo ""

# 1. Clear TypeScript cache
echo "1️⃣  Clearing TypeScript cache..."
rm -rf node_modules/.cache 2>/dev/null || true
find . -name "*.tsbuildinfo" -delete 2>/dev/null || true
find . -name ".eslintcache" -delete 2>/dev/null || true

echo "✅ TypeScript cache cleared"
echo ""

# 2. Clear VS Code extensions cache
echo "2️⃣  Clearing VS Code extension cache..."
rm -rf ~/.vscode/extensions/.cache 2>/dev/null || true
rm -rf ~/.vscode/workspaceStorage 2>/dev/null || true

echo "✅ VS Code cache cleared"
echo ""

# 3. Restart instructions
echo "3️⃣  Restart VS Code:"
echo "   - Close all VS Code windows"
echo "   - Wait 5 seconds"
echo "   - Reopen VS Code"
echo "   - Wait for TypeScript server to start (check bottom status bar)"
echo ""

echo "✅ Done! All caches cleared."
echo ""
echo "📝 If problems persist:"
echo "   yarn install"
echo "   Ctrl+Shift+P → TypeScript: Restart TS Server"
