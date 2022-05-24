## 使用mongdb,mongoose报警告；(node:9552) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

#### 使用mongoose连接mongdb数据库，控制台出现上面警告，这个并不会影响运行.要消除这个警告的方法是：在连接前加上：

```js
mongoose.set('useCreateIndex', true)   //加上这个就可以

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('数据库连接成功')
})
```

#### [stack overflow上的解读](https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat)



## (node:19608) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removedin a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

#### 其实我们阅读报的警告就可以解决:在mongoose连接的时候在第二个参数的对象中加入

```js
  useUnifiedTopology: true   
```

#### 即为：

```js
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true     //这个即是报的警告
}).then(res => {
  console.log('数据库连接成功')
})
```

