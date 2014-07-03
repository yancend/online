<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-19
 * Time: 下午5:33
 */

class doWithXML {
    public static function openXML($FileName){
        $doc = new DOMDocument();
        $doc->load($FileName); //读取xml文件
        return $doc;
    }
    public static function closeXML($FileName){
//        $doc = new DOMDocument();
//        $doc->load($FileName); //读取xml文件
//        return $doc;
    }
} 