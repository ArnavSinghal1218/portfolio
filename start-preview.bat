@echo off
echo ========================================================
echo  Launching Arnav Singhal's AI & Data Science Portfolio
echo ========================================================
echo.
echo Starting local web server on http://localhost:8000 ...
start http://localhost:8000
py -m http.server 8000
pause
