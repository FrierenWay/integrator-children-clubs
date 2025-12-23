<template>
  <v-container>
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Поиск кружка"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          @update:model-value="updateFilters"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="category"
          :items="categories"
          label="Категория"
          variant="outlined"
          clearable
          hide-details
          @update:model-value="updateFilters"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-slider
          v-model="maxPrice"
          :max="10000"
          :step="500"
          label="Цена до"
          thumb-label="always"
          color="primary"
          class="mt-4"
          @end="updateFilters"
        ></v-slider>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card, article"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else-if="circles.length > 0">
      <v-col v-for="item in circles" :key="item.id" cols="12" sm="6" md="4">
        <circle-card :circle="item" />
      </v-col>
    </v-row>

    <v-row v-else justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-icon size="64" color="grey-lighten-1">mdi-alert-circle-outline</v-icon>
        <p class="text-h6 text-grey">Кружки не найдены. Попробуйте изменить фильтры.</p>
      </v-col>
    </v-row>

    <v-btn-toggle v-model="viewMode" color="primary" mandatory class="mb-4">
      <v-btn value="list" prepend-icon="mdi-view-grid">Список</v-btn>
      <v-btn value="map" prepend-icon="mdi-map">Карта</v-btn>
    </v-btn-toggle>

    <div v-if="viewMode === 'map' && !loading">
      <app-map :circles="circles" />
    </div>
    <v-row v-if="viewMode === 'list' && !loading"></v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import CircleCard from '../components/CircleCard.vue';

export default {
  components: { CircleCard },
  setup() {
    const store = useStore();

    // Локальные реактивные переменные для фильтров
    const search = ref('');
    const category = ref(null);
    const maxPrice = ref(10000);

    const circles = computed(() => store.getters['circles/filteredCircles']);
    const loading = computed(() => store.state.circles.loading);
    const categories = computed(() => store.state.circles.categories);

    const updateFilters = () => {
      store.commit('circles/UPDATE_FILTERS', {
        search: search.value,
        category: category.value,
        maxPrice: maxPrice.value
      });
    };

    onMounted(() => {
      store.dispatch('circles/fetchCircles');
    });

    return {
      search,
      category,
      maxPrice,
      circles,
      loading,
      categories,
      updateFilters
    };
  }
};
</script>