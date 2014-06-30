<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-4-24
 * Time: 下午6:04
 */
require_once("config.php");
//foreach(V_Config::$addressToDownload as $a){
    header('Content-type: application/rar');
    header('Content-Disposition: attachment; filename="'.'a'.'.rar"');
    readfile(V_Config::$addressToDownload[0]);
//
//}

exit();