> axios number精度丢失问题

```js
import JSONBIGINT from 'json-bigint'

const service = axios.create({
    transformResponse: [
      (data) => {
        try {
          return JSONBIGINT.parse(data);
        } catch (err) {
          return data;
        }
      },
    ]
})


// 只要经过json-bigint转换后的id，直接toString()，就能得到真实的id
```

