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
		if "%%a"=="net" (
            copy /y %~p0\config_%%b-%%a.json %configPath%dist\%%b-%%a\net\config.json
        )
        if "%%a"=="asp" (
		    copy /y %~p0\config_%%b-%%a.json %configPath%dist\%%b-%%a\asp\config.json
        )
	)
)

