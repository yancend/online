@echo off
setlocal EnableDelayedExpansion
git clone %1 %2
cd %2
git checkout -b Branch_%3 %3
