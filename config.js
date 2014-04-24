/**
 * Created by dongyancen on 14-1-3.
 */
var Config = {
    'localWS':'D:\\workspace\\online\\ueditor',
    'githubRepos':'https://github.com/fex-team/umeditor.git',//https://github.com/fex-team/umeditor.git
//gitCheckout.bat https://github.com/campaign/ueditor.git D:\\workspace\\online\\ueditor v1.3.6
    //'./script/gitCheckout.bat '+ githubRepos +' '+localWS +' ' + tagNum
    'tagNum':'v1.2.2',
    'Version':'1.2.2',
    'basePath':'http://localhost/online/ueditor/dist/',
    'basePath_dist':'dist',
    'basePath_download':'\\download',
    'distPaths':['http://localhost:8000/online/ueditor/dist/utf8-asp',
        'http://localhost:8000/online/ueditor/dist/gbk-asp',
        'http://localhost:8000/online/ueditor/dist/utf8-net',
        'http://localhost:8000/online/ueditor/dist/gbk-net',
        'http://localhost:8080/online/ueditor/dist/utf8-jsp',
        'http://localhost:8080/online/ueditor/dist/gbk-jsp',
        'http://localhost/online/ueditor/dist/utf8-php',
        'http://localhost/online/ueditor/dist/gbk-php'],
    'distFileNamesToCheck':[
    'gbk-php',
    'utf8-php']//这里是检查生成的ueditor.all.js 跟后台无关,就只检查php的了

//    ,'localWS':''
//    ,'localWS':''

};