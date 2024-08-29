@echo off
cd frontend
call npm run build
cd ..
call conda activate .conda
.conda\python.exe manage.py collectstatic --noinput
start cmd /k ".conda\python.exe manage.py runserver"