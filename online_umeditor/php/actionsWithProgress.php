<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-18
 * Time: 下午5:55
 */
error_reporting(~E_ALL);
require_once('./class/doWithXML.php');
switch ($_POST['f']) {
    case 'nextProgress':
        nextProgress();
        break;
    case 'rollbackProgress':
        rollbackProgress($_POST['dest']);
        break;
};
function rollbackProgress($dest)
{
    //xml id ++
    $doc = doWithXML::openXML('../progress.xml');
    $doc->getElementsByTagName( "currentProgess" )->item(0)->setAttribute('progessId',$dest);
    $doc->save('../progress.xml');
    $doc = doWithXML::openXML('../progress.xml');
    $next = (int)($doc->getElementsByTagName( "currentProgess" )->item(0)->
        attributes->item(0)->nodeValue);
    if($next==$dest){
        echo 'true';
    }else{
        echo 'false';
    }
}
function nextProgress()
{
    //xml id ++
    $doc = doWithXML::openXML('../progress.xml');
    $current = (int)($doc->getElementsByTagName( "currentProgess" )->item(0)->
        attributes->item(0)->nodeValue);
    $doc->getElementsByTagName( "currentProgess" )->item(0)->setAttribute('progessId',($current+1));
    $doc->save('../progress.xml');
    $doc = doWithXML::openXML('../progress.xml');
    $next = (int)($doc->getElementsByTagName( "currentProgess" )->item(0)->
        attributes->item(0)->nodeValue);
    if($next==$current+1){
        echo 'true';
    }else{
        echo 'false';
    }
}