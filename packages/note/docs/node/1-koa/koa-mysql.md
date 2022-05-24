### koa2中对mysql简单封装实现增删改查的基本操作

#### 创建连接池

```js
import mysql from 'mysql';

import { MYSQL_CONFIG } from '../../config/index.js';

//配置文件
//export const MYSQL_CONFIG = {
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password: 'root',
//     database: 'user', //数据库名
// }

let pools = {};

//判断是否存在连接池不用每次都创建
if (!pools.hasOwnProperty('data')) {
    pools['data'] = mysql.createPool(MYSQL_CONFIG);
}

// 查询  
// sql 是sql语句
// values 是sql语句中的具体值
// sql values 可查看官方文档 https://github.com/mysqljs/mysql#performing-queries
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        //初始化连接池
        pools['data'].getConnection((err, connection) => {
            if (err) {
            	console.log(err,'数据库连接失败');
            }
            else{
            	console.log('数据库连接成功');
              //操作数据库
	            connection.query(sql, values, (err, results) => {
	                if (err) {
	                	reject(err);
	                } else {
	                	connection.release();
	                	resolve({
	                		status: 200,
	                		results
	                	});
	                }
	            });
            }
        })
    });
}

export default query;

```

#### 写对应的SQL语句

```js
const QUERY_SQL = `select * from demo`;
const INSERT_SQL = `INSERT INTO demo SET ?`;
const UPDATE_SQL = `UPDATE demo SET name=?,age=? WHERE id=?`;
const DELETE_SQL = `DELETE FROM demo WHERE id=?`;

export {
	QUERY_SQL,
	INSERT_SQL,
	UPDATE_SQL,
	DELETE_SQL,
};

```

#### 增删改查

> 结合koa-router 快速实现接口
>
> 测试接口的时候可使用postman

```js
import Router from 'koa-router';

import query from '../../db/mysql/query.js';
import { QUERY_SQL, INSERT_SQL, UPDATE_SQL, DELETE_SQL } from '../../db/mysql/utils/find.js';

const router = new Router();

//查询
// 测试时可简单创建 string: name, number: id, 自增主键id
router.get('/search', async ctx => {
	const data = await query(QUERY_SQL);
	ctx.body = {
		status: 200,
		data,
	};
});

// 插入
router.post('/save', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null } = res;
	if(name && age) {
		const queryData = {
			name,
			age,
		};
		const data = await query(INSERT_SQL, queryData);
		if(data && data.status && data.status === 200) {
			ctx.body = {
				status: 200,
				failed: false,
			};
		} else {
			ctx.body = data;
		}
	}
});

//更新
router.post('/update', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null, id } = res;
	if(name && age && id) {
		const queryData = [name, age, id];
		const data = await query(UPDATE_SQL, queryData);
		if(data && data.status && data.status === 200) {
			ctx.body = {
				status: 200,
				failed: false,
			};
		} else {
			ctx.body = data;
		}
	}
});

//根据主键id 删除
router.del('/delete', async ctx => {
	const res = ctx.request.body;
	const { id } = res;
	if(id) {
		const queryData = [id];
		const data = await query(DELETE_SQL, queryData);
		if(data && data.status && data.status === 200) {
			ctx.body = {
				status: 200,
				failed: false,
			};
		} else {
			ctx.body = data;
		}
	}
});

export default router;

```

### 入口中使用router

##### 使用ES6 `import`语法

> 这不是最佳实现，只是简单能在开发时使用

```json
  "scripts": {
    "start": "nodemon --exec babel-node server/app.js"
  },
  "dependencies": {
    "koa": "^2.11.0",
    "koa-bodyparser": "^4.3.0",
    "koa-json": "^2.0.2",
    "koa-router": "^8.0.8",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.6",
    "@babel/node": "^7.8.7",
    "@babel/preset-env": "^7.9.6",
    "nodemon": "^2.0.3"
  }
```
配置`.babelrc`
```shell
{
  "presets": ["@babel/preset-env"]
}
```
##### 入口文件app.js

```js
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

import MyDemo from '../interface/mysql/demo.js';
import { PORT } from '../config/index.js';

// PORT 运行的端口号

const app = new Koa();

app.use(bodyParser());
app.use(json());

app
	.use(MyDemo.routes())
	.use(MyDemo.allowedMethods())

app.listen(PORT, () => {
 console.log('服务启动');
});

```

