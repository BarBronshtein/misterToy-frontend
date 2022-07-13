<template>
  <section class="about-page">
    <div class="container">
      <GMapMap
        :center="center"
        :zoom="12"
        map-type-id="terrain"
        style="width: 800px; height: 800px"
      >
        <GMapCluster>
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="center = m.position"
          />
        </GMapCluster>
      </GMapMap>
      <div class="locations">
        <h2>Stores locations</h2>
        <el-button
          type="info"
          class="btn-locations"
          v-for="marker in markers"
          :key="marker"
          @click="center = marker.position"
        >
          {{ marker.location }}
        </el-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'map',
  data() {
    return {
      center: { lat: 32.07446846, lng: 34.791617341 },
      markers: [
        {
          position: {
            lat: 32.07446846,
            lng: 34.791617341,
          },
          location: 'tel-aviv',
        },
        {
          position: {
            lat: 29.549795,
            lng: 34.95463,
          },
          location: 'eilat',
        },
        {
          position: {
            lat: 32.65971,
            lng: 35.10516,
          },
          location: 'yokneam',
        },
      ],
    };
  },
};
</script>
