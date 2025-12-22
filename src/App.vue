<template>
  <v-app shadow>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title>Интегратор кружков</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text">Главная</v-btn>
      <v-btn to="/profile" variant="text">Кабинет</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer class="bg-grey-lighten-3 justify-center">
      <div>{{ new Date().getFullYear() }} — <strong>Детские Кружки</strong></div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>