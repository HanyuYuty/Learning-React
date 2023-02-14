//异步loader
module.exports = function async(content, map, meta) {
  const callback = this.async()
    

   setTimeout(()=>{
    callback(null, content, map, meta);
   },1000)

    return content;
};
