<?php
/**
 * Created by PhpStorm.
 * User: dongyancen
 * Date: 14-2-7
 * Time: 下午7:44
 */
class matchItem
{

    public $file_path;
    public $certain_sentence ;
    public $expect_result;
    function __construct( $file_path , $certain_sentence , $expect_result)
    {
        $this->file_path = $file_path;
        $this->certain_sentence = $certain_sentence;
        $this->expect_result = $expect_result;
    }
}