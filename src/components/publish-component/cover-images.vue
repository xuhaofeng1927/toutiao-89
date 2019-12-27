<template>
<div class="container">
<div class="imagescontent" v-for="(item,index) in imageslist" :key="index">
      <img :src="item?imageslist[index]:defaultImg" alt="" title="点击上传封面头像">
  </div>
</div>

</template>

<script>
import { request } from 'http'
export default {
  props: ['imageslist'],
  defaultImg: request('../../assets/img/pic_bg.png')
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
