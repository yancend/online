@echo off
setlocal EnableDelayedExpansion
set open=1
set configPath=%1
set severLang=php jsp asp net
set encoding=gbk utf8
for %%a in (%severLang%) do (
	for %%b in (%encoding%) do (

		cd %configPath%
		if exist %configPath%dist\%%b-%%a rd /s /q %configPath%dist\%%b-%%a

		%2 --server=%%a --encode=%%b
        copy /y %~p0\jquery.js %configPath%dist\%%b-%%a\jquery.js

	)
)

