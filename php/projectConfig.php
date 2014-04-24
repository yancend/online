<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-8
 * Time: 下午5:24
 */
class P_Config
{
    public  static $progressConfig = array(
      './html/download.html',
        './html/checkVer.html',
        './html/grunt.html' ,//生成dist ,检查文件,检查编码
        './html/runCases.html',               //粘贴demo和case页面,打开
 './html/pass.html'
    );
    public  static $ws = "D:\\workspace\\online";
//    public static $vToCheck = array(
//        //在工程目录下,要检查version的文件路径和匹配语句
//        array('\_src\editor.js','/version\s*:\s*"([^"]+)"/i'),// version : "1.1.0"
//        array('\package.json','/"version"\s*:\s*"([^"]+)"/i')//"version": "1.1.0",
//    );
//    public static $encodeToCheck = array(
//        //在工程目录下,要检查encode的路径和文件类型,可选的参数:自定义的匹配表达式
//        array('','html'),//默认匹配: charset=gbk,charset="gbk"
//        array('\dialog','css'),//默认匹配: @charset "gbk";
//        array('\php','php'),//默认匹配:  charset=gbk
//        array('\jsp','jsp',array('setCharacterEncoding("gbk")','pageEncoding="gbk"')),//默认匹配:  charset=gbk
//        array('\asp','asp',array('GetCharset = "utf-8"'))//charset=utf-8 GetCharset = "utf-8"
//    );
}