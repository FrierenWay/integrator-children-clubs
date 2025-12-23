<template>
  <v-container v-if="circle">
    <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="$router.back()" class="mb-4">
      Назад к поиску
    </v-btn>

    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="circle.image" height="400" cover class="rounded-lg elevation-2"></v-img>
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-2">
          <v-chip color="primary" size="small" label>{{ circle.category }}</v-chip>
          <v-spacer></v-spacer>
          <v-rating :model-value="circle.rating" color="amber" density="compact" readonly size="small"></v-rating>
        </div>

        <h1 class="text-h3 font-weight-bold mb-4">{{ circle.title }}</h1>
        <p class="text-body-1 mb-6">{{ circle.description }}</p>

        <v-list lines="two" class="bg-transparent">
          <v-list-item prepend-icon="mdi-map-marker" title="Адрес" :subtitle="circle.address"></v-list-item>
          <v-list-item prepend-icon="mdi-baby-face-outline" title="Возраст" :subtitle="`${circle.ageRange[0]} - ${circle.ageRange[1]} лет`"></v-list-item>
          <v-list-item prepend-icon="mdi-currency-rub" title="Стоимость" :subtitle="`${circle.price} ₽ в месяц`"></v-list-item>
        </v-list>

        <v-btn color="success" size="x-large" block prepend-icon="mdi-calendar-check" class="mt-6" @click="dialog = true">
          Записаться онлайн
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card title="Запись в кружок">
        <v-card-text>
          <p class="mb-4 text-subtitle-2 text-grey">Оставьте ваши данные, и руководитель кружка свяжется с вами.</p>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field v-model="booking.parentName" label="Ваше имя" :rules="[v => !!v || 'Обязательно']" variant="outlined"></v-text-field>
            <v-text-field v-model="booking.childName" label="Имя ребенка" :rules="[v => !!v || 'Обязательно']" variant="outlined"></v-text-field>
            <v-text-field v-model="booking.phone" label="Телефон" placeholder="+7 (___) ___-__-__" :rules="[v => !!v || 'Обязательно']" variant="outlined"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" :disabled="!isFormValid" @click="submitBooking">Отправить заявку</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="success" timeout="3000">
      Заявка успешно отправлена! Мы скоро свяжемся с вами.
    </v-snackbar>
  </v-container>

  <v-container v-else class="text-center py-10">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const dialog = ref(false)
    const snackbar = ref(false)
    const isFormValid = ref(false)
    const booking = ref({ parentName: '', childName: '', phone: '' })

    const circle = computed(() => {
      return store.state.circles.items.find(item => item.id === parseInt(route.params.id))
    })

    const submitBooking = () => {
      console.log('Данные записи:', booking.value)
      dialog.value = false
      snackbar.value = true
      booking.value = { parentName: '', childName: '', phone: '' }
    }

    onMounted(() => {
      if (store.state.circles.items.length === 0) {
        store.dispatch('circles/fetchCircles')
      }
    })

    return { circle, dialog, snackbar, isFormValid, booking, submitBooking }
  }
}
</script>