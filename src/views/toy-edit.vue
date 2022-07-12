<template>
  <section v-if="toyToEdit" class="toy-edit">
    <router-link to="/toy">Go Back</router-link>
    {{ toyToEdit }}
    <h2>{{ toyToEdit._id ? 'Edit toy' : 'Add toy' }}</h2>
    <el-form
      @submit.prevent="saveToy"
      class="container"
      style="max-width: 580px"
    >
      <el-form-item>
        <span> Toy name</span>
        <el-input
          v-model="toyToEdit.name"
          placeholder="Please enter toy name"
          required
          clearable
          style="width: 50%,padding-inline-start:1rem"
        />
      </el-form-item>
      <el-form-item>
        <span style="margin-inline-end: 1rem">Toy price</span>
        <el-input-number v-model.number="toyToEdit.price" />
      </el-form-item>
      <el-form-item>
        <span style="margin-inline-end: 1rem"> Toy labels </span>
        <el-select
          v-model="toyToEdit.labels"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="Select"
        >
          <el-option
            required
            v-for="(label, i) in labels"
            :key="i"
            :value="label"
          />
        </el-select>
      </el-form-item>

      <el-button class="btn-add-toy">
        {{ toyToEdit._id ? 'Update toy' : 'Add toy' }}
      </el-button>
    </el-form>
  </section>
</template>

<script>
import { toyService } from '../services/toy-services.js';

export default {
  data() {
    return {
      toyToEdit: null,
      labels: toyService.getLabels(),
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (toyId) {
      toyService.getById(toyId).then(toy => {
        this.toyToEdit = JSON.parse(JSON.stringify(toy));
      });
    } else this.toyToEdit = toyService.getEmptyToy();
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: 'saveToy', toy: this.toyToEdit })
        .then(() => {
          this.$router.push('/toy');
          //   this.$store.commit('setMsg', { txt: 'Save Toy', type: 'success' });
        });
      this.toyToEdit = toyService.getEmptyToy();
    },
  },
};
</script>
