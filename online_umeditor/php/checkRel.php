<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-4-23
 * Time: 下午5:48
 */
require_once('config.php');
require_once('class/doWithXML.php');
$file = V_Config::$workspace."\\dist\\report.xml";
$flag = 0;
if(file_exists($file)){
    $dom =doWithXML::openXML($file);
    $msgs = $dom->getElementsByTagName('msg');
    for($i = 0;$i  <$msgs->length;$i++){
            $flag += $msgs->item($i)->getAttribute('failed');
    }
//    $dom = $dom->documentElement;
}
echo $flag;