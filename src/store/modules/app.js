import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    tabIndex: Cookies.get('tabActive') || '1' 
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    CHANGE_TAB: (state, index) => {
      state.tabIndex = index;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ChangeTab: ({commit}, index) => {
      Cookies.set('tabActive', index);
      commit('CHANGE_TAB', index);
    }
  }
};

export default app;
