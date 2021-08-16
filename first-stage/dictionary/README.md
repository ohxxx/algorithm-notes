## 字典

**字典的定义**

> 字典是一种以`键-值`对 形式存储数据的数据结构。字典也称作映射，符号表或关联数组。如：{ key: value }

**字典的实现**

**[`Dictionary Demo`](./dictionary.js)**

> 实现了以下功能

```
set(key, value) 向字典中添加新元素。如果key已经存在，那么已存在的value会被新值覆盖
remove(key) 通过使用键值作为参数来从字典中移除键值对应的数据值
hasKey(key) 如果某个键值存在与该字典中，返回true，否则返回false
get(key) 通过以键值作为参数查找特定的数值并返回
clear() 删除该字典中的所有值
size() 返回字典中所包含值的数量。与数组的length属性相似
isEmpty() 在size()等于0的时候返回true，否则返回false
keys() 将字典所包含的所有键名以数组形式返回
values() 将字典所包含的所有数值以数组形式返回
keyValues() 将字典中所有[键， 值]对返回
forEach(callbackFn) 迭代字典中所有的键值对。callbackFn有两个参数：key和value。该方法可以在回调函数返回false时被中止（和Array类中的every方法相似）
```
