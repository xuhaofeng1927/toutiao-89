<template>
    <div class="first">
        <div ref='myecharts1' class="echarts1"></div>
        <div ref='myecharts2' class="echarts2"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myecharts1 = echarts.init(this.$refs.myecharts1)
    let myecharts2 = echarts.init(this.$refs.myecharts2)
    function my1 () {
      var data = []
      for (var i = 0; i <= 100; i++) {
        var theta = i / 100 * 360
        var r = 5 * (1 + Math.sin(theta / 180 * Math.PI))
        data.push([r, theta])
      }
      return data
    }
    function my2 () {
      var data = []

      for (var i = 0; i <= 360; i++) {
        var t = i / 180 * Math.PI
        var r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      return data
    }
    myecharts1.setOption({
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: my1()
      }]
    })
    myecharts2.setOption({
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: my2()
      }],
      animationDuration: 2000
    })
  }
}
</script>

<style lang='less' scoped>
    .first {
        min-height: 100vh;
        // background-image: url('../../assets/bdlg.jpg');
        // background-size: cover;
        display:flex;
        justify-content: center;
        .echarts1 {
            width: 600px;
            height: 600px;
        }
         .echarts2 {
            width: 600px;
            height: 600px;
        }
    }
</style>
