@echo off
title All Japan Internet - Project Launcher
echo ==============================================
echo Menyiapkan Aplikasi All Japan Internet...
echo ==============================================
echo.
echo Menjalankan Backend Laravel (PHP)...
start "Laravel Backend (Port 8000)" cmd /k "cd backend-api && php artisan serve"
echo - Server Backend diproses di jendela baru...


echo.
echo Menjalankan Frontend Next.js (Website Utama)...
start "Next.js Frontend (Port 3000)" cmd /k "cd frontend-user && npm start"
echo - Frontend diproses di jendela baru...

echo.
echo ==============================================
echo 2 Proses Dijalankan di Background!
echo ==============================================
echo.
echo Pastikan Anda membiarkan KEDUA jendela hitam (cmd) tersebut tetap terbuka.
echo Aplikasi Anda sekarang bisa diakses melalui:
echo - Website Utama : https://varro.my.id
echo - Admin Panel   : https://api.varro.my.id
echo.
pause
