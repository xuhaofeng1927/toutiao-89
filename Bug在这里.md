## 这是这个项目总结的bug
#### 问题：在传入对象数据时，找不到数据
```
 formData: {
        status: 5, // 默认为5为选中全部， 状态
        channel_id: null, // 默认为空，频道
        dataValue: [] // 默认为空，后面接受参数，日期
      },
```
```
 begin_pubdate: this.formData.dataValue.length
          ? this.formData.dataValue[0]
          : null, // Bug:没有写formData
        end_pubdate:
          this.formData.dataValue.length > 1 ? this.formData.dataValue[1] : null,
          ```
```
page: {
        total: 0, // 默认总页数
        pageSize: [10], // 默认每条页数，
        currentPage: 1 // 默认当前页数
      },
```
```
this.page.currentPage = newPage // 定义对象数据时一定不要忘了加对象page
```
#### Error in v-on handler: "TypeError: Cannot read property 'length' of null"
**翻译：** 无法正确读取属性
**解决办法：**