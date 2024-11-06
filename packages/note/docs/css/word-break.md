# word-break
1. 在布局过程中，有时候会遇到很长的一段字母或者数字

- 例如  `abcdiojihihhh123124jkkjhkhk5jh4kjh3k5jh43kj6hk5j6h`
- 此时如果超出容器是不会换行的

1. 解决方法

- 添加css属性： `word-break:break-all;`





##### 多行溢出 ...

```less
.clamp(@line) when (isnumber(@line)) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @line;
  word-break: break-all;
  overflow: hidden;
}
```

