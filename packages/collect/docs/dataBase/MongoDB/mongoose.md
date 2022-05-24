### mongoose

#### 1.1起步

+ 安装

  + ```shell
    npm install mongoose --save
    ```

+ hello world:(官网 quick start)

  + ```javascript
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    
    const Cat = mongoose.model('Cat', { name: String });
    
    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
    
    ```

+ ##### 1.1.1 开始

  + ```javascript
    var mongoose = require('mongoose');
    //架构
    var Schema = mongoose.Schema;
    //指定连接的数据库不需要存在，插入数据之后会自动的创建
    mongoose.connect('mongodb://localhost/test');
    //设计文档结构
    //字段名称就是表结构中属性名称
    var userSchema = new Schema({
    	username: {
    		type: String,
    		required: true    //约束  必须有
    	},
    	password: {
    		type: String,
    		required: true
    	},
    	email: {
    		type: String
    	}
    });
    //将文档结构发布为模型
    var User = mongoose.model('User', userSchema);
    
    ```

#### 1.2 命令

+ 查询数据：

  + ```javascript
    User.find(function (err, ret) {
      if (err) {
        console.log('查询失败')
      } else {
        console.log(ret)
      }
    })
    
    User.find({
      username: 'zs'
    }, function (err, ret) {
      if (err) {
        console.log('查询失败')
      } else {
        console.log(ret)
      }
    })
    
    User.findOne({
      username: 'zs'
    }, function (err, ret) {
      if (err) {
        console.log('查询失败')
      } else {
        console.log(ret)
      }
    })
    ```

+ 增加数据：

  + ```javascript
    //需要先实例化出对象，再进行持久化存储
    var admin = new User({
      username: 'zs',
      password: '123456',
      email: 'admin@admin.com'
    })
    
    admin.save(function (err, ret) {
      if (err) {
        console.log('保存失败')
      } else {
        console.log('保存成功')
        console.log(ret)
      }
    })
    ```

+ 删除数据：

  + ```javascript
    User.remove({
      username: 'zs'
    }, function (err, ret) {
      if (err) {
        console.log('删除失败')
      } else {
        console.log('删除成功')
        console.log(ret)
      }
    })；
    //根据条件删除一个数据
    //Model.findOneAndRemove(conditions,[options],[callback])
    //根据ID删除一个数据
    //Model.findByIdAndRemove(id,[option],[callback])
    ```

+ 更新数据：

  + ```javascript
    //更新数据 需要根据ID  mongodb默认给我们加的
    User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
      password: '123'
    }, function (err, ret) {
      if (err) {
        console.log('更新失败')
      } else {
        console.log('更新成功')
      }
    })
    ```


