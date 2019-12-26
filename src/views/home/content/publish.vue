<template>
  <el-card class="articles-up" shadow="never">
    <breark-crumbs slot="header">
      <template slot="title">发表内容</template>
    </breark-crumbs>
    <el-form :label-position="labelPosition" label-width="80px" :model="publishForm">
      <el-form-item label="文章标题">
        <el-input v-model="publishForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="publishForm.region"></el-input>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-radio-group v-model="publishForm.radio">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button plain>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      publishForm: {
        name: '',
        region: '',
        type: '',
        radio: -1
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  }
}
</script>

<style>
</style>
