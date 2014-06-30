@echo off
setlocal EnableDelayedExpansion
cd %2
git checkout dev
git pull origin
git checkout %3