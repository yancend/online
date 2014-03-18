<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-3-17
 * Time: 下午4:47
 */
require_once("projectConfig.php");
require_once("config.php");
exec(P_Config::$ws."\\script\\npmInstall.bat ".V_Config::$workspace."\\",$back,$b);//ok
echo $b==0;
//print_r($back);