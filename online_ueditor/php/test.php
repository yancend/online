<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-5-28
 * Time: 下午6:08
 */
$current_dir = opendir('D:\workspace\online\online_ueditor\ueditor\dist\gbk-jsp\dialogs'); //D:\workspace\online\ueditor\dist\gbk-jsp\php
while (($file = readdir($current_dir)) !== false) { //readdir()返回打开目录句柄中的一个条目
//    if (get_extension($file) == $e[1]) {
        print_r($file);
//    } else {
//        continue;
//    }
}