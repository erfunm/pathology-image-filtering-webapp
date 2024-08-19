<template>
  <div>
    <h1>
      Profiles <span v-if="data">({{ total }})</span>
    </h1>
    <ul class="list" v-if="data">
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
      total: 0,
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
        this.total = response.data.content.total
        this.data = response.data.content.list
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    }
  }
}
</script>

<style scoped>
ul.list {
  list-style-type: none;
  padding: 0;
}
ul.list li {
  border: 1px solid #999;
  border-radius: 10px;
  padding: 20px;
  display: inline-block;
  margin: 5px;
  background-color: #eee;
}
ul.list li:hover {
  background-color: #ddd;
}
ul.list li a {
  text-decoration: none;
  color: #333;
}
ul.list li a:hover {
  color: #000;
  text-decoration: underline;
}
</style>
