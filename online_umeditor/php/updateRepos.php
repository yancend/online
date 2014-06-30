<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-3-17
 * Time: 下午4:08
 */
require_once("projectConfig.php");
//todo 检查完如果返回true是通过,其他都是不通过
//修改php.ini 开启exec ,修改cmd.exe文件属性 开启读取

exec(V_Config::$ws."\\script\\updateRepos.bat ".$_POST['githubWorkSpaceName'] .' '.$_POST['localWorkSpaceName'].' '. $_POST['tagNumName'],$back);//ok
echo "true";