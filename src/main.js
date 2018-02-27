// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import './assets/style.css'
import './assets/logo.png'

Vue.config.productionTip = false

/* eslint-disable no-new */

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.getElementById('mobileSupport').style.display = 'block'
} else {
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
}
