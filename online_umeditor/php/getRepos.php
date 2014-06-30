<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-1-2
 * Time: 下午6:17
 */
require_once("projectConfig.php");
//todo 检查完如果返回true是通过,其他都是不通过
//修改php.ini 开启exec ,修改cmd.exe文件属性 开启读取

exec(V_Config::$ws."\\script\\gitCheckout.bat ".$_POST['githubWorkSpaceName'] .' '.$_POST['localWorkSpaceName'].' '. $_POST['tagNumName'],$back);//ok
echo "true";