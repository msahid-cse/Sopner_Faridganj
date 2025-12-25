@echo off
echo ========================================
echo Testing Sopner Faridganj Backend API
echo ========================================
echo.

echo Testing Health Endpoint...
curl -s http://localhost:5000/health
echo.
echo.

echo Testing Hero Images...
curl -s http://localhost:5000/api/hero
echo.
echo.

echo Testing Statistics...
curl -s http://localhost:5000/api/stats
echo.
echo.

echo Testing Advisors...
curl -s http://localhost:5000/api/advisors
echo.
echo.

echo Testing Gallery Categories...
curl -s http://localhost:5000/api/gallery/categories?year=2025
echo.
echo.

echo ========================================
echo All Tests Complete!
echo ========================================
pause
