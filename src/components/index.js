import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-heade'
import Brearkcrumbs from './break-crumbs'
import { quillEditor } from 'vue-quill-editor' // 引入quill组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css' // 引入富文本css样式
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 全局注册侧边栏
    Vue.component('layoutHeade', layoutHeade) // 全局注册头部标题
    Vue.component('breark-crumbs', Brearkcrumbs) // 全局注册一个面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编译器
  }
}
