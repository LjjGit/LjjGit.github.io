---
title: 数组获取通过下标获取元素的过程
---

js 数组通过下标访问元素时，会调用下标数字的`toString()`方法。通过以下代码可测试：

```js
const a = [1, 2, 3, 4, 5];

const index = new class extends Number {
    toString(radix)
    {
        const value = super.toString(radix);
        console.log(`调用了 toString 转换下标; super.toString(radix): ${value}; radix: ${radix}`);
        return value;
    }
} (2);

console.log(a[index]);
```

输出：
```
调用了 toString 转换下标; super.toString(radix): 2; radix: undefined
3
```
