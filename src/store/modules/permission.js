import {
    asyncRouterMap,
    constantRouterMap
} from '@/router/index';
console.log(constantRouterMap)
const _import = require('@/router/_import_' + process.env.NODE_ENV);

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

/**
 * [getRouters 用于根据后台返回的JSON路由表，递归生成可用的路由表]
 * @param  {[array]} arr     [后台返回JSON路由表]
 * @param  {Array}  routers [保存转换后的新路由表]
 * @return {[array]}         [routers]
 */
function getRouters(arr, routers = []) {
    arr.map(item => {
        var th = {};
        for (var key in item) {
            var val = item[key];
            if (key == 'children' && item.children.length !== 0) {
                th.children = getRouters(item.children);
            } else if (key == 'component') {
                th[key] = _import(val);
            } else {
                th[key] = val;
            }
        }
        routers.push(th);
    });
    return routers
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                // const { roles } = data
                let accessedRouters;
                console.log(1);
                
                    // if (roles.indexOf('admin') >= 0) {
                accessedRouters = asyncRouterMap
                    // } else {
                    //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                    // }
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        }
    }
};

export default permission;