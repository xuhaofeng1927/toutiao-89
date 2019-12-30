<template>
  <div>
      <el-card class="box-card" shadow="never">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">粉丝列表</template>
    </breark-crumbs>
    <div ref="myecharts" class="myecharts"></div>
    {{list}}
      </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      list: {
        le18: '',
        le23: '',
        le30: '',
        le40: '',
        le50: ''
      },
      list2: ['0-18', '19-23', '24-30', '31-40', '40-50', '50+']
    }
  },
  // methods: {

  // },
  // created () {
  //   this.getfollowers()
  // },
  mounted () {
    this.$axios({
      url: '/statistics/followers'
      // data: {
      //   mobile: '18232063671',
      //   code: '246810'
      // }
    }).then(result => {
      this.list = result.data.age
      let myecharts = echarts.init(this.$refs.myecharts)
      // let list = result.data.age
      // console.log(list)
      myecharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.list2
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.list.le18, name: '0-18' },
              { value: this.list.le23, name: '19-23' },
              { value: this.list.le30, name: '24-30' },
              { value: this.list.le40, name: '31-40' },
              { value: this.list.le50, name: '40-50' },
              { value: this.list.gt50, name: '50+' }

            ]
          }
        ]
      })
    })
  }

}
</script>

<style lang='less' scoped>
.myecharts {
  width: 600px;
  height: 400px;
}
</style>
