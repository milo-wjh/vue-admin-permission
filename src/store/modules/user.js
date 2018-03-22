import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import Cookies from 'js-cookie';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERID: ( state ,userid) => {
      state.userid = userid;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        login(email, userInfo.password).then(response => {
          const data = response.data;
          // setToken(data.token);
          // commit('SET_TOKEN', data.token);
          Cookies.set('FM-Token', data.token);
          Cookies.set('FM-UserId', data.userid);
          Cookies.set('FM-UserName', data.username);
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.username);
          commit('SET_USERID', data.userid);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
