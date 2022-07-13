<template>
  <section class="about-page">
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
      <div class="locations">
        <h2>Store Branches</h2>
        <span
          v-for="m in markers"
          @click="center = m.position"
          class="location-btn"
          >{{ m.location }}</span
        >
      </div>
    </div>
  </section>
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
            location: 'Tel Aviv',
          },
          position: {
            lat: { lat: 32.0123545, lng: 34.84212 },
            location: 'Haifa',
          },
          position: {
            lat: { lat: 32.1123545, lng: 34.83212 },
            location: 'Ashdod',
          },
          position: {
            lat: { lat: 34.0113545, lng: 32.554212 },
            location: 'Ashdod Ber Sheva',
          },
        },
      ],
      center: { lat: 32.066278, lng: 34.830301 },
    };
  },
};
</script>
