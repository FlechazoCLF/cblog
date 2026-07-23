@echo off
chcp 65001 >nul
echo "============Auto Starting...============"

echo "Generator Start"
start "Generator" cmd /c "npm run generate"

echo "blog Start"
call npm start
echo "============Auto Complete============"
