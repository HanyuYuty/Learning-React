/**
 * 同步loader
 * content 文件内容
 *  map source-map
 *  meta 给下一个loader传参数
*/

module.exports = function sync(content, map, meta) {
    /**
     * @param  {any} null 处理时是否有错误，无为null;
    */ 
     
    this.callback(null, content, map, meta);

    return content;
};
