<template>
  <div>
    <h1>Profiles:</h1>
    <ul v-if="data">
      <li v-for="(item, index) in data" :key="index">
        <router-link :to="{ name: 'profile', params: { id: item, page: 1 } }">{{
          item
        }}</router-link>
      </li>
    </ul>
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
import api from '../api' // Import your API service

export default {
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.get('/content/list') // Replace with your actual endpoint
        this.data = response.data.content.list
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    }
  }
}
</script>
