/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import { Tooltip } from 'bootstrap'
import mitt from 'mitt'

import '~fontawesome-free/js/fontawesome.min.js'
import '~fontawesome-free/js/solid.min.js'
import '~fontawesome-free/js/brands.min.js'

import './scss/styles.scss'

const vueApp = createApp(App)
vueApp.config.unwrapInjectedRef = true
vueApp.config.globalProperties.emitter = mitt();
vueApp.mount('#main')

const tooltipTriggerList = document.querySelectorAll('*[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
