<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-1-2
 * Time: 下午6:17
 */
//V_Config 的结构与内容由project的需求决定
class V_Config
{
    public static $workspace = 'D:\workspace\online\ueditor';
    public static $version = '1.1.0';
    public  static $servers = array('php','jsp','net','asp');
    public  static $codes = array('utf8','gbk');
    public  static $distName = 'umeditor';//$servers.'_'.$codes.'_'.$distName
    public  static $grundCMD ='C:\Users\dongyancen\AppData\Roaming\npm\grunt.cmd';
    public  static $distFileNames = array(
        'gbk-jsp',
        'utf8-jsp',
        'gbk-net',
        'utf8-net',
        'gbk-php',
        'utf8-php',
        'gbk-asp',
        'utf8-asp',

    );
    public static $vToCheck = array(
        //在工程目录下,要检查version的文件路径和匹配语句
        array('\_src\editor.js','/version\s*:\s*"([^"]+)"/i'),// version : "1.1.0"
        array('\package.json','/"version"\s*:\s*"([^"]+)"/i')//"version": "1.1.0",
    );
    public static $encodeToCheck = array(
        //在工程目录下,要检查encode的路径和文件类型,可选的参数:自定义的匹配表达式
        array('','html',array('/charset\s*=\s*"?([^"]+)"?/i')),//默认匹配: charset=gbk,charset="gbk"
        array('\dialogs\map','html',array('/charset\s*=\s*"?([^"]+)"?/i')),//默认匹配: charset=gbk,charset="gbk"
        array('\dialogs\formula','html',array('/charset\s*=\s*"?([^"]+)"?/i')),//默认匹配: charset=gbk,charset="gbk"
        array('\dialogs\video','css',array('/@charset\s*"([^"]+)"/i')),//默认匹配: @charset "gbk";
        //todo 没有制定文件夹的工程就不检查,能容错
        array('\php','php',array('/charset\s*=\s*([^"]+)/i')),//默认匹配:  charset=gbk
        array('\jsp','jsp',array('/charset\s*=\s*([^"]+)/i','/setCharacterEncoding\("([^"]+)"\)/i','/pageEncoding="([^"]+)"/i')),//默认匹配:  charset=gbk
        array('\asp','asp',array('/charset\=([^"]+)/i','/GetCharset\s*=\s*"([^"]+)"/i'))//charset=utf-8 GetCharset = "utf-8"
    );
    public static $distPath = '\dist';
    public static $serverFilesToCheck = array(
        'php'=>array('/php/getContent.php','/php/imageUp.php','/php/Uploader.class.php'),
        'asp'=>array('/asp/getContent.asp','/asp/imageUp.asp','/asp/Uploader.Class.asp'),
        'jsp'=>array('/jsp/commons-fileupload-1.2.2.jar','/jsp/getContent.jsp','/jsp/imageUp.jsp','/jsp/ueditor-mini.jar','/jsp/Uploader.java'),
        'net'=>array('/net/getContent.ashx','/net/imageUp.ashx','/net/Uploader.cs')
    );
//    public static function getServerFilesToCheck(){
//       $filesToCheck = array();
//
//        array_push($filesToCheck,array('\gbk-php',V_Config::$serverFilesPaths['php']));
//        array_push($filesToCheck,array('\utf8-php',V_Config::$serverFilesPaths['php']));
//        array_push($filesToCheck,array('\gbk-asp',V_Config::$serverFilesPaths['asp']));
//        array_push($filesToCheck,array('\utf8-asp',V_Config::$serverFilesPaths['asp']));
//        array_push($filesToCheck,array('\gbk-jsp',V_Config::$serverFilesPaths['jsp']));
//        array_push($filesToCheck,array('\utf8-jsp',V_Config::$serverFilesPaths['jsp']));
//        array_push($filesToCheck,array('\gbk-net',V_Config::$serverFilesPaths['net']));
//        array_push($filesToCheck,array('\utf8-net',V_Config::$serverFilesPaths['net']));
//
//        return $filesToCheck;
//    }
    public static $sameFilesWithSourceToCheck = array(
        '\dialog' =>false,//如果为真,要检查同时检查生成文件的大小是否与源文件相同
        '\lang' =>true,
        '\third-party'  =>true,
        '\themes\default\images ' =>true

    );
    public static $certainToCheck = array(

        '\themes\default\css\umeditor.css',
        '\themes\default\css\umeditor.min.css',
        '\index.html',
        '\umeditor.config',
        '\umeditor.js',
        '\umeditor.min.js'
    );
//public static function distFileNames(){
//
//}

};
function isUTF8($str)//需要在php.ini中开启extension=php_mbstring.dll
    //todo 已经经过验证,可用
{
    if ($str === mb_convert_encoding(mb_convert_encoding($str, "UTF-32", "UTF-8"), "UTF-8", "UTF-32"))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
$content = file_get_contents("D:\\workspace\\ueditormini\\dist\\gbk-php\\index.html");
//echo isUTF8($content);