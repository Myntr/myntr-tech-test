/**
 * imports
 */
import { createApp } from 'vue'
import { createStore } from 'vuex'
import './css/main.scss'

/**
 * Lazyloading
 * Leverage native lazy loading when supported, only use lazysizes if necessary.
 */
if ( !("loading" in HTMLImageElement.prototype) ) {
  require('lazysizes');
}

/**
  * 3rd party components
  *
  * Import 3rd party components and their assets here.
  * In the thirdPartyComponents object, set the key, with prefix 'render' for rendered componenents and 'renderless' for renderless components.
  * The key will be automatically prefixed with 'tp-' when the component is registered.
  * For example, if the key is 'render-marquee', use the component in Liquid files like this: <tp-render-marquee></tp-render-marquee>
  */

const thirdPartyComponents = {}

/**
 * vuex
 * auto-import all modules and prepare shared store
 */
const vuexModules = require.context('./vue/store/', true, /\.js$/)
const modules = {}

vuexModules.keys().forEach(key => {
  const name = key.replace(/\.(\/|js)/g, '').replace(/\s/g, '-')
  modules[name] = vuexModules(key).default
})

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

/**
 * create vue instance function
 */
const createVueApp = () => {
  const app = createApp({})

  /**
   * vue components
   * auto-import all vue components
   */
  const vueComponents = require.context('./vue/components/', true, /\.(vue|js)$/)

  vueComponents.keys().forEach(key => {
    const component = vueComponents(key).default

    // if a component has a name defined use the name, else use the path as the component name
    const name = component.name
      ? component.name
      : key.replace(/\.(\/|vue|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase())

    app.component(name, component)
  })

  // register third party components with prefix `tp-`
  if ( Object.keys(thirdPartyComponents).length > 0 ) {
    Object.entries(thirdPartyComponents).forEach(entry => {
      const [key, value] = entry
      app.component(`tp-${key}`, value)
    })
  }

  /**
   * vue mixins
   * auto-register all mixins with a 'global' keyword in their filename
   */
  const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)

  mixins.keys().forEach(key => {
    app.mixin(mixins(key).default)
  })

  /**
   * vue directives
   * auto-register all directives with a 'global' keyword in their filename
   */
  const directives = require.context('./vue/directives/', true, /.*global.*\.js$/)

  directives.keys().forEach(key => {
    const directive = directives(key).default
    app.directive(directive.name, directive.directive)
  })

  /**
   * vue plugins
   * extend with additional features
   */
  app.use(store)

  return app
}

/**
 * create and mount vue instance(s)
 */
const appElement = document.querySelector('#app')

if (appElement) {
  createVueApp().mount(appElement)
} else {
  const vueElements = document.querySelectorAll('[vue]')
  if (vueElements) vueElements.forEach(el => createVueApp().mount(el))
}

/**
 * fixes for Shopify sections
 * 1. properly render vue components on user insert in the theme editor
 * 2. reload the current page to rerender async inserted sections with vue components
 *
 * add the 'vue' keyword to the section's wrapper classes if the section uses any vue functionality e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    if (event.target.classList.value.includes('vue')) {
      createVueApp().mount(event.target)
    }
  })
} else if (!Shopify.designMode && process.env.NODE_ENV === 'development') {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach(record => {
      const vue = Array.from(record.addedNodes).find(node => node.classList && node.classList.value.includes('vue'))
      if (vue) window.location.reload()
    })
  }).observe(document.body, {
    childList: true,
    subtree: true
  })
}
