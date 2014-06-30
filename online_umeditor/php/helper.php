<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-1-2
 * Time: 下午7:15
 */
//拆开形如:a=0&b=1
function splitParameter($s){
    $rel = Array();
    $str = preg_split('/[&=]/', $s);

    for ($i = 0; $i < sizeof($str); $i += 2) {
        $rel[$str[$i]] = $str[$i + 1];
    }
    return $rel;
}