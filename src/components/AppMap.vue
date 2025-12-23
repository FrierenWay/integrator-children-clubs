<template>
  <div id="map" class="rounded-lg elevation-2" style="height: 400px; width: 100%;"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    circles: { type: Array, default: () => [] }
  },
  setup(props) {
    let map = null;

    onMounted(() => {
      // Инициализация карты (центр города)
      map = L.map('map').setView([55.7558, 37.6173], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      props.circles.forEach(circle => {
        // Для примера ставим случайные точки рядом с центром
        const lat = 55.75 + (Math.random() - 0.5) * 0.1;
        const lng = 37.61 + (Math.random() - 0.5) * 0.1;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${circle.title}</b><br>${circle.address}`);
      });
    });

    onUnmounted(() => {
      if (map) map.remove();
    });
  }
}
</script>