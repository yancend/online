<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-4-9
 * Time: 下午6:44
 */
$distNum = 2;
$paths = split('/',$_SERVER['HTTP_REFERER']);
$encodeAndServer = $paths[count($paths)-2];
$file = "report_.xml";
$dom = new DOMDocument('1.0', 'utf-8');
if(file_exists($file)){
    $dom->load($file);
    $rel = $dom->getElementsByTagName('rel')->item(0);
}
else{
    $rel = $dom->appendChild($dom->createElement('rel'));
}
$msgs = $dom->getElementsByTagName('msg');
$flag = true;
for($i = 0;$i  <$msgs->length;$i++){
    if($msgs->item($i)->getAttribute('encodeAndServer') == $encodeAndServer){
        $reportMsg = $msgs->item($i);
        $flag = false;
        break;
    }
}
if($flag){
    $reportMsg = $rel->appendChild($dom->createElement('msg'));
}
$reportMsg->setAttribute('encodeAndServer',$encodeAndServer);
$reportMsg->setAttribute('failed', $_POST['failed']);
$num = $dom->getElementsByTagName('msg')->length;
$dom->save($file);
if($num==$distNum){
    rename("report_.xml","report.xml");
}