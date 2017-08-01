import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Initializing the router with options
var router = new VueRouter({
  history: false
});

// const router = new VueRouter({ routes });
// const app = new Vue({ router }).$mount('#app');

router.map({
  // Not found handler
  '*': {
    component: {
      template: '<h1>Not Found</h1>'
    }
  },
  '/': { 
    component: {
      template: '<div><h1>Home</h1><p>{{ test }}</p></div>',
      data: function() {
        return {
          test: 'Hello I am Vue.JS'
        }
      }
    }
  },
  '/about': { 
    component: {
      template: '<h1>About</h1>'
    }
  },
});