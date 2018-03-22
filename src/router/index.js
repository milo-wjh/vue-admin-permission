import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* dashboard */
const dashboard = _import('dashboard/index');

/* test page */
const test1 = _import('test1/index');
const test2 = _import('test2/index');
const test3 = _import('test3/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
const Table = _import('table/index');

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  },
  {
    path: '/test1',
    component: Layout,
    name: 'test1',
    icon: 'tubiaoleixingzhengchang',
    noDropdown: true,
    children: [{ path: 'index', component: test1, name: 't1'}]
  },
  {
    path: '/test2',
    component: Layout,
    name: 'test2',
    icon: 'tubiaoleixingzhengchang',
    noDropdown: true,
    children: [{ path: '/:id', component: test2, name: 't2'}]
  },
  {
    path: '/test3',
    component: Layout,
    name: 'test3',
    icon: 'tubiaoleixingzhengchang',
    noDropdown: true,
    children: [{ path: 'index', component: test3, name: 't3'}]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', component: Form, name: 'Form', icon: 'zonghe' }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    name: 'Table',
    icon: 'tubiaoleixingzhengchang',
    noDropdown: true,
    children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] } }]
  },

  { path: '*', redirect: '/404', hidden: true }
];

function fn(n, o) {
  console.log(o);
  return {
    fn: function(m) {
      console.log(fn);
      return fn(m,n);
    }
  }
}
var a = fn(0); a.fn(1); 
for(var i = 4; i--;) {
  setTimeout(function() {
    console.log(i)
  }, i * 100)
}

function getRandom(num) {
  return Math.floor(Math.random() * num);
}

function getArr() {
  var a = getRandom(100);
  var b = getRandom(100);

  return newArr(a, b);
}

function newArr(a, b) {
  if (a > b) {
    return add(a, b);
  } else {
    return  add(b, a);
  }
  
}
function add(big, sml) {
  var arr = [];
  for(var i = 0; i < (big - sml); i++) {
    if (sml + i > big) {
      return arr;
    } else {
      arr.push(sml + i);
    }
  }
  return arr
}

var fullName = 'milo';
var obj = {
  fullName: 'objmilo',
  prop: {
    fullName: 'propmilo',
    getFullName: function() {
      console.log(this);
      return this.fullName;
    }
  }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test, 'test');

function getRd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}