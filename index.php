<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-18
 * Time: 下午4:46
 */
//读取当前进度
require_once('php/class/doWithXML.php');
$doc = doWithXML::openXML('progress.xml');
$currentProgess = $doc->getElementsByTagName( "currentProgess" )->item(0)->
    attributes->item(0)->nodeValue;
require_once('php/projectConfig.php');
//根据进度加载页面
$pageToLoad = P_Config::$progressConfig[$currentProgess];
include($pageToLoad);