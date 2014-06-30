@echo off
setlocal EnableDelayedExpansion
cd %2
git checkout %4
git pull origin
git checkout %3