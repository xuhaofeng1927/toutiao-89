<template>
  <div class="container">
    <div
      class="imagescontent"
      v-for="(item,index) in imageslist"
      :key="index"
      @click="openDialog(index)"
    >
      <img :src="item ? item : defaultImg" alt title="点击上传封面头像" />
    </div>
    <!-- 生成的元素在body上，用visible控制显示 -->
    <el-dialog :visible.sync="dialogVisible" width="50%" :close="handleClose">
      <!-- 这里用来接受子组件传过来的值 -->
        <!-- 接收其子元素<upload-image>传过来的值（url） -->
      <upload-image @selectImage='replaceImage'></upload-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props 为只读的不能修改
  props: ['imageslist'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      imageindex: ''
    }
  },
  methods: {
    // 1,打开盒子功能
    openDialog (id) {
      this.dialogVisible = true
      this.imageindex = id // 定义一个下标
    },
    // 2,关闭盒子功能
    handleClose () {
      this.dialogVisible = false
    },
    // 3,将传过来的值进行传递给mageslist
    // props 为只读的不能修改,所以不能传递给mageslist,需要再次子传父传递给其父元素publish
    replaceImage (imgUrl) {
      this.$emit('aginReplaceImage', imgUrl, this.imageindex) // 传递图片地址和图片下标
      this.handleClose()
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  .imagescontent {
    border: 1px solid red;
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
