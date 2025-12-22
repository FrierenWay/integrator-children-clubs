<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Главная"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="Личный кабинет"
          to="/profile"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" elevation="3">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold" style="cursor: pointer" @click="$router.push('/')">
        <v-icon icon="mdi-school" class="mr-2"></v-icon>
        Интегратор Кружков
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
        <v-btn to="/" variant="text" prepend-icon="mdi-magnify">Поиск</v-btn>
        <v-btn to="/profile" variant="text" prepend-icon="mdi-account-circle">Кабинет</v-btn>
      </div>

      <v-btn icon class="ml-2">
        <v-badge color="error" content="2" floating>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container>
        <router-view v-slot="{ Component }">
          <v-fade-transition mode="out-in">
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column pa-4">
      <div>
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" variant="text" size="small"></v-btn>
      </div>
      <div class="pt-2 text-caption">
        &copy; {{ new Date().getFullYear() }} — <strong>Kids Circles Integration</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const drawer = ref(false)
    const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']

    return {
      drawer,
      icons
    }
  }
}
</script>

<style scoped>
/* Плавный переход для контента */
.v-main {
  min-height: 80vh;
}
</style>