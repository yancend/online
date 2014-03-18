<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-3-11
 * Time: 下午8:03
 */
require_once("helper.php");
require_once("config.php");
require_once("class/configDetail.php");
$v_ = $_POST['basePath'];
$ws = V_Config::$workspace;
echo $v_;
$s_to_check = V_Config::$serverFilesToCheck;
$f_to_check = V_Config::$sameFilesWithSourceToCheck;
$c_to_check =V_Config::$certainToCheck;
$v_files = array();
$msg = '';
//$file = fopen($ws.$v_, "r");
echo $ws.$v_.V_Config::$servers[0].'_'.V_Config::$codes[0].'_'.V_Config::$distName;
echo file_exists($ws.$v_.V_Config::$servers[0].'_'.V_Config::$codes[0].'_'.V_Config::$distName);
//fclose($file);