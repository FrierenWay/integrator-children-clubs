<template>
  <v-card class="mx-auto h-100" max-width="400" hover>
    <v-img :src="circle.image" height="200px" cover>
      <v-chip class="ma-2" color="primary" label>
        {{ circle.category }}
      </v-chip>
    </v-img>

    <v-card-item>
      <v-card-title>{{ circle.title }}</v-card-title>
      <v-card-subtitle>
        <v-icon icon="mdi-map-marker" size="small" color="error"></v-icon>
        {{ circle.address }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="d-flex align-center mb-2">
        <v-rating
          :model-value="circle.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>
        <span class="text-grey ms-2">{{ circle.rating }}</span>
      </div>
      <div class="text-subtitle-1 font-weight-bold">
        {{ circle.price }} ₽ / мес.
      </div>
      <div class="text-caption">Возраст: {{ circle.ageRange[0] }} - {{ circle.ageRange[1] }} лет</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="elevated"
        block
        :to="{ name: 'CircleDetail', params: { id: circle.id }}"
      >
        Подробнее
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    circle: { type: Object, required: true }
  }
}
</script>