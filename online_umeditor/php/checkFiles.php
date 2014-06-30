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

$flag = true;
$msg = '';
function traverse($f)
{
    global $msg;
    $path =V_Config::$workspace . DIRECTORY_SEPARATOR . $f;//$f 相对于项目目录,比如:umeditor
    $current_dir = opendir($path); //opendir()返回一个目录句柄,失败返回false
    while (($file = readdir($current_dir)) !== false) { //readdir()返回打开目录句柄中的一个条目
        $sub_dir = $path . DIRECTORY_SEPARATOR . $file; //构建子目录路径
        if ($file == '.' || $file == '..') {
            continue;
        } else if (is_dir($sub_dir)) { //如果是目录,进行递归
            traverse($f.DIRECTORY_SEPARATOR.$file);
        } else { //如果是文件, 找到所有dist中的项目,查看是否有对应文件
            foreach (V_Config::$distFileNames as $d) {
                //$d 是目标文件夹,如:gbk-asp
                if (file_exists(V_Config::$workspace . DIRECTORY_SEPARATOR. V_Config::$basePath_dist .DIRECTORY_SEPARATOR . $d. DIRECTORY_SEPARATOR . $f.DIRECTORY_SEPARATOR.$file) === false){
                    $flag = false;
                $msg .= ' Cannot find file : " ' . V_Config::$workspace . DIRECTORY_SEPARATOR. V_Config::$basePath_dist .DIRECTORY_SEPARATOR . $d. DIRECTORY_SEPARATOR . $f.DIRECTORY_SEPARATOR.$file . '"\n ';
                }
                else;
            }
        }
    }
}

function checkFiles()
{
    global $msg,$flag;
    $c_to_check = V_Config::$certainToCheck;
    $f_to_check = V_Config::$sameFilesWithSourceToCheck;
    $s_to_check = V_Config::$serverFilesToCheck;

    foreach (V_Config::$distFileNames as $d) {
        $ws = V_Config::$workspace . DIRECTORY_SEPARATOR . V_Config::$basePath_dist . DIRECTORY_SEPARATOR . $d;
        //检查指定的,打包后产生的文件
        foreach ($c_to_check as $f) {
            if (file_exists($ws . $f) === false) {
                $flag = false;
                $msg .= ' Cannot find file : " ' . $ws . $f . '"\n ';
            } else;
        }
        $severFiles = $s_to_check[$d];
        //检查对应的后台文件
        foreach ($severFiles as $f) {
            if (file_exists($ws . $f) === false) {
                $flag = false;
                $msg .= ' Cannot find file : " ' . $ws . $f . '"\n ';
            } else;
        }

    }
    //某些文件下的文件,是用源文件同名文件夹中文件直接拷贝的,一一对应的文件
    foreach ($f_to_check as $f) {
        traverse($f);
    }
    //检查对应的后台文件
    return $flag;

}
$r = checkFiles();
if ($r) {
    echo $r;
} else {
    echo $msg;
}