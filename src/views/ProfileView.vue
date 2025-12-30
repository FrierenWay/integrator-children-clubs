<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="text-center pa-6">
          <v-avatar size="120" color="primary" class="mb-4">
            <v-icon size="64" color="white">mdi-account</v-icon>
          </v-avatar>
          <h2 class="text-h5">Александр Иванов</h2>
          <p class="text-grey">Родитель</p>
          <v-btn color="primary" variant="outlined" block class="mt-4">Редактировать</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <h3 class="text-h5 mb-4">Мои записи</h3>
        <v-card v-if="myBookings.length === 0" variant="outlined" class="pa-10 text-center">
          <v-icon size="48" color="grey">mdi-calendar-blank</v-icon>
          <p>У вас пока нет активных записей</p>
          <v-btn to="/" variant="text" color="primary">Найти кружок</v-btn>
        </v-card>

        <h3 class="text-h5 my-6">Рекомендовано для вас</h3>
        <v-row>
          <v-col v-for="item in recommendations" :key="item.id" cols="12" sm="6">
            <v-card border flat>
              <v-img :src="item.image" height="120" cover></v-img>
              <v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
              <v-card-actions>
                <v-btn :to="`/circle/${item.id}`" variant="text" color="primary">Смотреть</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const myBookings = [];

    const recommendations = computed(() => {
      return store.state.circles.items.slice(0, 2);
    });

    return { myBookings, recommendations };
  }
}
</script>