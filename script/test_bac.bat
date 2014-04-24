@echo off
setlocal EnableDelayedExpansion
set open=1
set configPath=D:\workspace\online\ueditor\
set severLang=jsp net php
set encoding=utf8 gbk
set phpPath=D:\workspace\
set phpUrl=localhost/
set jspPath=D:\program\tomcat\apache-tomcat-7.0.42\webapps\
set jspUrl=localhost:8080/
set netPath=D:\workspace\
set netUrl=localhost:8000/
set browserPath=C:\Users\dongyancen\AppData\Local\Google\Chrome\chrome.exe
for %%a in (%severLang%) do (
	for %%b in (%encoding%) do (

		cd %configPath%
		C:\Users\dongyancen\AppData\Roaming\npm\grunt.cmd --server=%%a --encode=%%b
		copy /y %~p0\mini_%%b_completeDemo.html %configPath%dist\%%b-%%a\completeDemo.html
                copy /y %~p0\jquery.js %configPath%dist\%%b-%%a\jquery.js
		if exist %configPath%dist\%%a_%%b_umeditor rd /s /q %configPath%dist\%%a_%%b_umeditor
		ren %configPath%dist\%%b-%%a %%a_%%b_umeditor
		if "%%a"=="php" (
                    xcopy /y /e /i %configPath%dist\%%a_%%b_umeditor %phpPath%%%a_%%b_umeditor
		    rd /s /q %configPath%dist\%%a_%%b_umeditor
		)
		if "%%a"=="jsp" (
                    xcopy /y /e /i %configPath%dist\%%a_%%b_umeditor %jspPath%%%a_%%b_umeditor
		    rd /s /q %configPath%dist\%%a_%%b_umeditor
		)
		if "%%a"=="net" (
		    xcopy /y /e /i %configPath%dist\%%a_%%b_umeditor %netPath%%%a_%%b_umeditor
		    rd /s /q %configPath%dist\%%a_%%b_umeditor
		)
	)
)
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
