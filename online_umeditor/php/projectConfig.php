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
        './pages/gitUpdate.html',//拉代码,如果手动拉过,可以跳过
        './pages/checkVer.html',//检查版本
        './pages/grunt.html' ,//生成dist ,检查编码,检查文件
        './pages/runCases.html',//粘贴demo和case页面,打开
        './pages/pass.html'
    );
}