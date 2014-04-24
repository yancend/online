<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-3-19
 * Time: 下午12:12
 */

require_once("projectConfig.php");
require_once("config.php");
$b_ = $_POST['basePath'];
if(file_exists(V_Config::$workspace."\\dist\\report.xml")){
    unlink(V_Config::$workspace."\\dist\\report.xml");
}
if(file_exists(V_Config::$workspace."\\dist\\report_.xml")){
    unlink(V_Config::$workspace."\\dist\\report_.xml");
}
///
exec(P_Config::$ws."\\script\\prepareCases.bat ".V_Config::$workspace."\\" . $b_."\\" ,$back,$b);//ok
echo $b==0;