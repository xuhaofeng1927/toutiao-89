<template>
<div class="container">
<div class="imagescontent" v-for="(item,index) in imageslist" :key="index">
      <img src="../../assets/img/pic_bg.png" alt="" title="点击上传封面头像">
  </div>
</div>

</template>

<script>
export default {
  props: ['imageslist']
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        justify-content: flex-start;
        .imagescontent {
            border: 1px solid red;
            width:200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
