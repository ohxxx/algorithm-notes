## 1507. 转变日期格式

**描述**

给你一个字符串 date ，它的格式为 Day Month Year ，其中：

- Day  是集合  {"1st", "2nd", "3rd", "4th", ..., "30th", "31st"}  中的一个元素。
- Month  是集合  {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}  中的一个元素。
- Year  的范围在 ​[1900, 2100]  之间。

请你将字符串转变为  YYYY-MM-DD  的格式，其中：

- YYYY  表示 4 位的年份。
- MM  表示 2 位的月份。
- DD  表示 2 位的天数。

**实例**

```
1、
  输入：date = "20th Oct 2052"
  输出："2052-10-20"
2、
  输入：date = "6th Jun 1933"
  输出："1933-06-06"
3、
  输入：date = "26th May 1960"
  输出："1960-05-26"
```

**思路**

```
1、月份使用集合存储获取
2、天正则replace
```

**实现**

```js
/**
 * @param {string} date
 * @return {string}
 */
var reformatDate = function (date) {
  const monthArr = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const splitData = date.split(" ");
  const year = splitData[2];
  const month = monthArr[splitData[1]];
  const day = splitData[0].replace(/[a-z]/g, "").padStart(2, "0");

  return [year, month, day].join("-");
};
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，没有循环，很干净  
`空间复杂度`：O(1)，没有数组矩阵，都是变量作为辅助空间，故渐进复杂度为 O(1)

**官方**

```python
# python
class Solution:
  def reformatDate(self, date: str) -> str:
    s2month = {
        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
        "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    }

    date = date.split(" ")

    date[0] = date[0][: -2].zfill(2)
    date[1] = s2month.get(date[1])
    date.reverse()

    return "-".join(date)

```

**官方-复杂度分析**  
`时间复杂度`：O(1)  
`空间复杂度`：O(1)
