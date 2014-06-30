@echo off
setlocal EnableDelayedExpansion
set configPath=%1
set severLang=jsp net php asp
set encoding=utf8 gbk
copy /y %~p0\cases\cases.js %configPath%\cases.js
copy /y %~p0\cases\qunit.css %configPath%\qunit.css
copy /y %~p0\cases\recode.php %configPath%\recode.php
copy /y %~p0\cases\testrunner.js %configPath%\testrunner.js
copy /y %~p0\cases\UserAction.js %configPath%\UserAction.js
for %%a in (%severLang%) do (
	for %%b in (%encoding%) do (

	cd %configPath%
	copy /y %~p0\cases\submit_%%b.html %configPath%\%%b-%%a\submitDemo.html
	copy /y %~p0\cases\autoCases.html %configPath%\%%b-%%a\autoCases.html

	)
)
