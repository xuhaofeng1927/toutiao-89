import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-heade'
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutHeade', layoutHeade)
  }
}
