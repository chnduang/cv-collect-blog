### Koa结合MongoDB使用

> nodejs使用koa对mongdb数据库进行增删改查的操作

#### 创建一个简单的工程

+ 使用npm init 或者 yarn init都是可以的
+ 这里使用yarn

#### 安装依赖

> 这里列出会用到的所有依赖，直接安装了

##### Koa相关

+ ```shell
  yarn add koa koa-bodyparser koa-router
  
  // koa-bodyparser koa-router
  	这里的功能可以直接搜对应的名称npm中都有详细说明它的作用，这里简单叙述
  // koa
  ```

##### MongoDB

+ ```shell
  yarn add mongoose
  ```

#### 创建连接

```js
import { MONDB_URL } from '../../config/index.js';
const mongoose = require('mongoose');

// export const MONDB_URL = "mongodb://127.0.0.1:27017/user";

mongoose.connect(MONDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
	console.log('数据库连接成功...');
});

db.on('error', (error) => {
	console.log('数据库连接失败...', error);
});

db.on('disconnected', () => {
	console.log('数据库已断开');
});

export default mongoose;

```

#### 创建`schema model`

```js
import mongoose from '../index.js';

const Schema = mongoose.Schema;

const demoSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	age: {
		type: Number,
		require: true,
	},
});

const demoModal = mongoose.model('Demo', demoSchema);

export default demoModal;

```

#### 增删改查utils

```js
// sql语句的操作方法,使用时只需引入即可
const query = (_Modal, _query = {}) => {
 	return new Promise((resolve, reject) => {
   		_Modal.find(_query, (err, res) => {
    		if(err) {
       			reject(err)
     		}
     		resolve(res)
   		});
 	});
};

const save = (_model) => {
	return new Promise((resolve, reject) => {
		_model.save((err, data) => {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

const update = (_model, oldData, newData) => {
	return new Promise((resolve, reject) => {
		_model.update(oldData, newData, (err, data) => {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

const updateOne = (_model, oldData, newData) => {
	return new Promise((resolve, reject) => {
		_model.updateOne(oldData, newData, (err, data) => {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

const deleteOne = (_model, _data) => {
	return new Promise((resolve, reject) => {
		_model.deleteOne(_data, (err, data) => {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

export {
	query,
	save,
	update,
	updateOne,
	deleteOne,
};

```



```js
import Router from 'koa-router';

import DemoModal from '../../db/mongdb/model/demo.js';
import { query, save, update, updateOne, deleteOne } from '../../utils/mongo-query.js';

const router = new Router();

// 查询
router.get('/search', async ctx => {
	const res = await query(DemoModal);
	ctx.body = {
		status: 200,
		results: res,
	};
});

// 保存数据
router.post('/save', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null } = res;
	if(name && age) {
		const demoModal = new DemoModal({
			name,
			age,
		});
		const res = await save(demoModal);
		ctx.body = {
			status: 200,
			results: res,
		};
	}
});

// 更新数据
router.post('/update', async ctx => {
	const res = ctx.request.body;
	const { name = '', age = null } = res;
	if(name && age) {
    // 更新符合条件的所有数据
		// const res = await update(DemoModal, { name }, { age });
    // 更新单条数据
		const res = await updateOne(DemoModal, { _id: name }, { age });
		ctx.body = {
			status: 200,
			results: res,
		};
	}
});

// 删除
router.del('/delete', async ctx => {
	const res = ctx.request.body;
	const { id } = res;
	if(id) {
    // 根据id删除数据
		const res = await deleteOne(DemoModal, { _id: id });
		ctx.body = {
			status: 200,
			results: res,
		};
	}
});

export default router;

```

#### 入口

```js
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

import Demo from '../interface/mongo/demo.js';
import { PORT } from '../config/index.js';

const app = new Koa();

app.use(bodyParser());
app.use(json());

app
	.use(Demo.routes())
	.use(Demo.allowedMethods())

app.listen(PORT, () => {
 console.log('服务启动');
});

```

