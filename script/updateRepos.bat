@echo off
setlocal EnableDelayedExpansion
cd %2
git pull %1
git checkout %3