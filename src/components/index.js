import layoutAside from './home-component/layout-aside'
import layoutHeade from './home-component/layout-heade'
import Brearkcrumbs from './break-crumbs' // 引入面包屑组件
import { quillEditor } from 'vue-quill-editor' // 引入quill组件
import coverImage from './publish-component/cover-images'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css' // 引入富文本css样式
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 全局注册侧边栏
    Vue.component('layoutHeade', layoutHeade) // 全局注册头部标题
    Vue.component('breark-crumbs', Brearkcrumbs) // 全局注册一个面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编译器
    Vue.component('cover-images', coverImage) // 全局注册封面组件
  }
}
