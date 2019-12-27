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
**解决办法：*
#### button按钮添加事件时默认值问题
```
 <el-button type="primary" @click='publishAticle()'>发布</el-button>
 <el-button plain @click='publishAticle(true)'>存入草稿</el-button>
```
不写括号代表有默认形参，加上括号代表为null==>false

####  Object.keys(对象)将对象的属性遍历生成数组
#### watch 监听深拷贝
```
{a:{ b:{ c:"张三" } }}
watch: {
    "a.b.c":function(){},
     a:{ 
       handler:function(){},
       deep:true // handler和deep 为必须值
     }
}
```