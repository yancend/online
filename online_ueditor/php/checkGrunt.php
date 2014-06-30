<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-1-2
 * Time: 下午7:12
 */
require_once("projectConfig.php");
require_once("config.php");
set_time_limit(300);
//todo 调用grunt
//todo 装grunt
exec(P_Config::$ws."\\script\\grunt.bat ".V_Config::$workspace."\\ ".V_Config::$grundCMD,$back,$b);//ok
echo $b==0;