<template>
  <div class="container">
    <GMapMap
      :center="center"
      :zoom="13"
      map-type-id="terrain"
      style="width: 50vw; height: 900px"
    >
      <GMapMarker
        :key="i"
        v-for="(m, i) in markers"
        :position="m.position"
        :clickable="true"
        @click="center = m.position"
      />
    </GMapMap>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      markers: [
        {
          position: {
            lat: { lat: 32.066278, lng: 34.830301 },
          },
          position: {
            lat: { lat: 32.0123545, lng: 34.84212 },
          },
          position: {
            lat: { lat: 32.1123545, lng: 34.83212 },
          },
          position: {
            lat: { lat: 34.0113545, lng: 32.554212 },
          },
        },
      ],
      center: { lat: 32.066278, lng: 34.830301 },
    };
  },
};
</script>
