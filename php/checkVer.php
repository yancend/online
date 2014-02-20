<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-8
 * Time: 下午7:12
 */
require_once("helper.php");
require_once("config.php");
require_once("class/configDetail.php");
require_once("projectConfig.php");
$v_ = V_Config::$version;
$ws = V_Config::$workspace;
$v_to_check = V_Config::$vToCheck;
//'/\/\/\/import\s+([^;]+);?/ies' 'version\s*:\s*"\S+";'
//$v_files = array('\_src\editor.js'=>'version : "'.$v_.'"','\package.json'=>'"version": "'.$v_.'"');
//version : "1.1.0"
//ueditor: $v_files = array(new matchItem('\_src\editor.js','/UE.version\s*=\s*"([^"]+)"/i','1.3.6'));
$v_files = array();
$msg = '';
//$v_files = array(new matchItem($ws.'\_src\editor.js','/version\s*:\s*"([^"]+)"/i',$v_));
function chkVersion()
{
    global $v_files, $ws, $v_to_check, $v_, $msg;
    $flag = true;
    foreach ($v_to_check as $s) {
        if ($s[0] && $s[1]) {
            array_push($v_files, new matchItem($ws . $s[0], $s[1], $v_));
        }
    }

    foreach ($v_files as $p) {
        $file = fopen($p->file_path, "r");
        while (!feof($file)) {
            $is = array();
            preg_match_all($p->certain_sentence, fgets($file), $is);
            if (count($is[1]) > 0) {
                $rv = str_replace(' ', '', $is[1][0]);
                if ($rv != $v_) {
                    $flag = false;
                    $msg .= "wrong version message in file: " . $p->file_path . " .expect: " . $v_ . " result: " . $rv . "\n";

                }
            }
        }
        fclose($file);
    }
    return $flag;
}

$f = chkVersion();
if ($f) {
    echo $f;
} else {
    echo $msg;
}
//$config = splitParameter($_POST['config']);
//todo 调用grunt
//echo $config["workspace"];

/*//判断文件编码
function chkCode($string){
$code = array('ASCII', 'GBK', 'UTF-8');
foreach($code as $c){
  if( $string === iconv('UTF-8', $c, iconv($c, 'UTF-8', $string))){//转换编码后是不是相等
   return $c;
  }
}
return null;
}*/
