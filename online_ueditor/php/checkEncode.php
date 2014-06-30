<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-3-11
 * Time: 下午7:31
 */

require_once("helper.php");
require_once("config.php");
require_once("class/configDetail.php");
require_once("projectConfig.php");
$b_ = $_POST['basePath'];
$ws = V_Config::$workspace;
$e_to_check = V_Config::$encodeToCheck;
$msg = '';
function readFiles($dir, $current_dir, $e_files, $d, $e)
{
    global $b_, $ws;
    while (($file = readdir($current_dir)) !== false) { //readdir()返回打开目录句柄中的一个条目
        if ($file != "." && $file != ".." && !strpos($file, ".")) {
            echo 'file: ' . $dir . '\\' . $file;
            $tmp = readFiles($dir . '\\' . $file, opendir($dir . '\\' . $file), $e_files, $d, $e);
            $e_files = array_merge($e_files, $tmp);

        }

        if (get_extension($file) == $e[1]) {
            foreach ($e[2] as $c) {
                array_push($e_files, new matchItem($ws . DIRECTORY_SEPARATOR . $b_ . DIRECTORY_SEPARATOR . $d . $e[0] . DIRECTORY_SEPARATOR . $file, $c, getEncode($d)));
            }

        } else {
            continue;
        }
    }
    return $e_files;
}

function chkEncode()
{
    global $b_, $ws, $e_to_check, $msg;
    $e_files = array();

    $flag = true;
    foreach (V_Config::$distFileNames as $d) {

        foreach ($e_to_check as $e) {
            if (!macthServer($d, $e[0])) {

                continue;
            }
            $dir = $ws . DIRECTORY_SEPARATOR . $b_ . DIRECTORY_SEPARATOR . $d . $e[0];
//            echo $dir;
            $current_dir = opendir($dir); //D:\workspace\online\ueditor\dist\gbk-jsp
//            $e_files = readFiles($dir,$current_dir,$e_files,$d,$e);
//            print_r($e_files.'\n');
            while (($file = readdir($current_dir)) !== false) { //readdir()返回打开目录句柄中的一个条目

                if ($file != "." && $file != ".." && !strpos($file, ".")) {
//                    echo 'file: ' .$dir . DIRECTORY_SEPARATOR . $file;
                    $tmp = opendir($dir . DIRECTORY_SEPARATOR . $file);
                    while (($file_tmp = readdir($tmp)) !== false){
                        if (get_extension($file_tmp) == $e[1]) {
                            foreach($e[2] as $c){
                                array_push($e_files, new matchItem($ws . DIRECTORY_SEPARATOR . $b_ . DIRECTORY_SEPARATOR . $d . $e[0] . DIRECTORY_SEPARATOR  . $file. DIRECTORY_SEPARATOR. $file_tmp, $c, getEncode($d)));
                            }
//
                        } else {
                            continue;
                        }
                    }

                }
                if (get_extension($file) == $e[1]) {
                    foreach ($e[2] as $c) {
                        array_push($e_files, new matchItem($ws . DIRECTORY_SEPARATOR . $b_ . DIRECTORY_SEPARATOR . $d . $e[0] . DIRECTORY_SEPARATOR . $file, $c, getEncode($d)));
                    }

                } else {
                    continue;
                }
            }
        }
    }
//    print_r($e_files);
    foreach ($e_files as $p) {
        $file = fopen($p->file_path, "r");
        while (!feof($file)) {
            $is = array();
            preg_match_all($p->certain_sentence, fgets($file), $is);
            if (count($is[1]) > 0) {
                $rv = str_replace(' ', '', $is[1][0]);
                preg_match($p->expect_result, $rv, $m);
                if (count($m) == 0) {
                    $flag = false;
                    $msg .= "wrong version message in file: " . $p->file_path . " .expect: " . $p->expect_result . " result: " . $rv . "\n";
                }
            }
        }
        fclose($file);
    }
    return $flag;
//    print_r($msg);
//    return $msg;
}

$f = chkEncode();
if ($f) {
    echo $f;
} else {
    echo $msg;
}
//$config = splitParameter($_POST['config']);
//todo 调用grunt
//echo $config["workspace"];

/*//判断文件编码dialog里的js \    html        \zh-cn js
function chkCode($string){
$code = array('ASCII', 'GBK', 'UTF-8');
foreach($code as $c){
  if( $string === iconv('UTF-8', $c, iconv($c, 'UTF-8', $string))){//转换编码后是不是相等
   return $c;
  }
}
return null;
}*/
function get_extension($file)
{
    return substr(strrchr($file, '.'), 1);
}

function macthServer($dir, $ser)
{
    preg_match('/php|jsp|net|asp/', $ser, $m);
    if (count($m) == 0) {
        return true;
    }
    if (!stristr($dir, str_replace('\\', '', $ser))) {
        return false;
    }
    return true;
}

function getEncode($dir)
{
    preg_match('/gbk/i', $dir, $m);
    if (count($m)) return '/gbk/';
    else return '/utf(-?)8/i';
}