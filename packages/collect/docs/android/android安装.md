### Android Studio报错unable to access android sdk add-on list解决方案

```bash
unable to access android sdk add-on list
```

3.1 主动设置SDK
如果本机有Android SDK的话，可以点击cancel跳过，在下一个界面手动选择本地SDK目录就可以了。

3.2 跳过检测
在Android Studio的安装目录下，找到\bin\idea.properties
在尾行添加disable.android.first.run=true，表示初次启动不检测SDK

