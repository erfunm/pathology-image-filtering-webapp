<template>
  <div class="card">
    <div class="profile-id">
      <h2>
        Profiles <span v-if="data">({{ total }})</span>
      </h2>
    </div>
    <div class="controllers">
      <button @click="exportCSV">{{ exportBtnTxt }}</button>
    </div>
    <hr />
    <ul class="list" v-if="data">
      <li v-for="(item, index) in data" :key="index" :title="item">
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
      data: null,
      exportBtnTxt: 'Export CSV'
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.get('/content/list')
        this.total = response.data.content.total
        this.data = response.data.content.list
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    },
    async exportCSV() {
      try {
        this.exportBtnTxt = 'Exporting...'
        await api.post('/content/list/export-csv')
        this.exportBtnTxt = 'Export CSV'
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    }
  }
}
</script>

<style scoped>
div.profile-id {
  width: 50%;
  text-align: left;
  display: inline-block;
}
div.controllers {
  width: 50%;
  text-align: right;
  display: inline-block;
}
ul.list {
  list-style-type: none;
  padding: 0;
}
ul.list li {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  display: inline-block;
  width: 10%;
  margin: 0 2px;
  background-color: #eee;
  font-size: 10pt;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
ul.list li:hover {
  border-color: #999;
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
