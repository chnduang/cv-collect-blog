### 工具函数

> 使用crypto-js加解密

```js
/**
 * 加解密
 */
import CryptoJS from 'crypto-js';
// 加密
 const encrypt = (word, keyStr) => { 
    const keyString = keyStr ? keyStr : 'abcdefgabcdefg12';
    const key  = CryptoJS.enc.Utf8.parse(keyString);
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode:CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
//解密
// key : 密钥， word解密字符
// iv: 偏移量 一般约定如果加密未加，则可不传
 const decrypt = (word, keyStr) => {  
    const keyString = keyStr ? keyStr : 'abcdefgabcdefg12';
    const key  = CryptoJS.enc.Utf8.parse(keyString);
    const decrypted = CryptoJS.AES.decrypt(word, key, {
      mode:CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted).toString();
  }

export {
  encrypt,
  decrypt，
}
```

