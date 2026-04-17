@echo off
REM ============================================
REM CLEAN VS CODE ERRORS (Windows)
REM ============================================

echo.
echo 🧹 Cleaning VS Code cache and TypeScript errors...
echo.

REM 1. Clear TypeScript cache
echo 1. Clearing TypeScript cache...
for /d /r . %%d in (.cache) do @if exist "%%d" rd /s /q "%%d" 2>nul || true
for /r . %%f in (*.tsbuildinfo) do @if exist "%%f" del "%%f" 2>nul || true
for /r . %%f in (.eslintcache) do @if exist "%%f" del "%%f" 2>nul || true

echo [OK] TypeScript cache cleared
echo.

REM 2. Clear VS Code extensions cache
echo 2. Clearing VS Code extension cache...
if exist "%APPDATA%\.vscode\extensions\.cache" (
    rmdir /s /q "%APPDATA%\.vscode\extensions\.cache" 2>nul || true
)

echo [OK] VS Code cache cleared
echo.

REM 3. Restart instructions
echo 3. Next steps:
echo    - Close all VS Code windows
echo    - Wait 5 seconds
echo    - Reopen VS Code
echo    - Press Ctrl+Shift+P
echo    - Type: TypeScript: Restart TS Server
echo    - Wait 10 seconds
echo.

echo [OK] All caches cleared!
echo.
echo If problems persist, run:
echo    yarn install
echo    Ctrl+Shift+P ^> TypeScript: Restart TS Server
echo.

pause
