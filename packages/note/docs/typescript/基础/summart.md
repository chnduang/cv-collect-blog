# TS相关

## 接口

### 可选属性

> 可以不存在

```tsx
interface MyProps {
	id?: number
}
```

### 任意属性

> 必选属性和可选属性需要 是其子集
>
> 可选存在undefined的情况

```tsx
interface MyProps {
  name: string;
  id?: number;
  [propName: string]: number | string | undefined;
}
```

### 只读属性

> 只有在创建的时候被赋值

```tsx
interface Myprops1 {
  readonly name: string;
}
```

## 数组

