## 小程序中使用uuid

> 微信小程序可以使用`npm`包下载，然后像使用其他包那样直接引入使用即可
>
> 如果小程序不支持第三方包的，就需要自行写方法进行导出了
>
> 该方法亲测可用，生成的`uuid`的格式为：  `7b611f1e-6a5f-4501-b658-27295f275066`

+ 创建文件—`_uuid.js`

  ```js
  const uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
   
    var uuid = s.join("");
    return uuid
  }
  
  // 需要导出
  module.exports = {
      uuid
  }
  ```

+ 使用

  ```js
  // 引入
  // 使用相对路径引入创建的文件
  const util = require('../utils/_uuid.js');
  
  // 使用时直接使用即可
  getUUid() {
      const uuid = util.uuid();
      // 可打印值看看
      // `7b611f1e-6a5f-4501-b658-27295f275066`
  }
  ```