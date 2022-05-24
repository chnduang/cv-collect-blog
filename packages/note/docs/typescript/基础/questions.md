### ts中使用lodash

使用import _ as * from 'lodash' 报错，lodash不是模块

这是由于第三方库没有ts的声明文件要想使用的话

可以

```bash
yarn add @types/lodash
npm install --save @types/lodash
```

