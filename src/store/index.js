import { createStore } from 'vuex';
import circles from './modules/circles';

export default createStore({
  modules: {
    circles
  },

  state: {
    user: {
      isLoggedIn: false,
      name: 'Гость'
    }
  }
});