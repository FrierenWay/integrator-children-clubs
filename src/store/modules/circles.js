// Имитация данных с бэкенда
const mockCircles = [
  {
    id: 1,
    title: 'Робототехника "Лего-Мастер"',
    category: 'Наука',
    ageRange: [6, 12],
    price: 3500,
    rating: 4.8,
    address: 'ул. Пушкина, 10',
    image: 'https://via.placeholder.com/300x200?text=Robotics',
    description: 'Изучение основ механики и программирования на базе наборов LEGO Education.'
  },
  {
    id: 2,
    title: 'Студия балета "Грация"',
    category: 'Искусство',
    ageRange: [4, 16],
    price: 5000,
    rating: 4.9,
    address: 'пр. Мира, 5',
    image: 'https://via.placeholder.com/300x200?text=Ballet',
    description: 'Классическая хореография для детей всех уровней подготовки.'
  },
  {
    id: 3,
    title: 'Футбольный клуб "Старт"',
    category: 'Спорт',
    ageRange: [7, 14],
    price: 2800,
    rating: 4.5,
    address: 'Стадион Локомотив',
    image: 'https://via.placeholder.com/300x200?text=Football',
    description: 'Профессиональные тренировки по футболу под руководством опытных тренеров.'
  }
];

export default {
  namespaced: true,
  state: () => ({
    items: [],
    loading: false,
    categories: ['Спорт', 'Искусство', 'Наука', 'Языки'],
    filters: {
      search: '',
      category: null,
      maxPrice: 10000,
      age: null
    }
  }),

  getters: {
    // Основная логика фильтрации
    filteredCircles: (state) => {
      return state.items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(state.filters.search.toLowerCase());
        const matchesCategory = !state.filters.category || item.category === state.filters.category;
        const matchesPrice = item.price <= state.filters.maxPrice;
        const matchesAge = !state.filters.age || (state.filters.age >= item.ageRange[0] && state.filters.age <= item.ageRange[1]);

        return matchesSearch && matchesCategory && matchesPrice && matchesAge;
      });
    }
  },

  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    UPDATE_FILTERS(state, newFilters) {
      state.filters = { ...state.filters, ...newFilters };
    }
  },

  actions: {
    // Имитация запроса к API
    async fetchCircles({ commit }) {
      commit('SET_LOADING', true);
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1500));
      commit('SET_ITEMS', mockCircles);
      commit('SET_LOADING', false);
    }
  }
};