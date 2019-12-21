import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-heade'
import Brearkcrumbs from './break-crumbs'
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutHeade', layoutHeade)
    Vue.component('breark-crumbs', Brearkcrumbs)
  }
}
