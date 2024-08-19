<template>
  <div class="card">
    <div class="profile-id">
      <router-link to="/list">List</router-link>
      <h3>{{ $route.params.id }}'s images ({{ pager.total }}):</h3>
    </div>
    <div class="controllers">
      <button @click="exportCSV">Generate JSON file</button>
    </div>
    <hr />
    <div class="pager">
      <ul>
        <li v-if="pager.prev">
          <router-link :to="{ name: 'profile', params: { page: pager.prev } }"
            >Previous</router-link
          >
        </li>
        <li v-for="page in pager.pages" :key="page">
          <strong v-if="page == $route.params.page">{{ page }}</strong>
          <router-link v-else :to="{ name: 'profile', params: { page } }">{{
            page
          }}</router-link>
        </li>
        <li v-if="pager.next">
          <router-link :to="{ name: 'profile', params: { page: pager.next } }"
            >Next</router-link
          >
        </li>
      </ul>
    </div>
    <hr />
    <div class="album" v-if="data">
      <ul>
        <li v-for="(item, index) in SortList(FilterQueue(data))" :key="index">
          <img
            crossorigin="anonymous | use-credentials"
            :src="GetImageSrc(item)"
            @click="AddToQueue(item)"
            title="Click to add to the queue" />
        </li>
      </ul>
    </div>
    <hr />
    <div class="album" v-if="queue.length">
      <h5>
        Queue ({{ queue.length }}):
        <button @click="deleteAll">Delete All</button>
      </h5>
      <ul>
        <li v-for="(item, index) in queue" :key="index">
          <img
            crossorigin="anonymous | use-credentials"
            :src="GetImageSrc(item)"
            @click="RemoveFromQueue(item)"
            title="Click to remove from the queue" />
        </li>
      </ul>
    </div>
    <p v-if="!data">Loading...</p>
    <p v-if="!queue.length">Queue is empty!</p>
  </div>
</template>

<script>
import api from '../api' // Import your API service

export default {
  data() {
    return {
      data: null,
      queue: [],
      pager: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData({
      profileId = this.$route.params.id,
      page = this.$route.params.page
    } = {}) {
      try {
        const response = await api.get(
          `/content/profile/${profileId}?filter=images&page=${page}`
        ) // Replace with your actual endpoint
        this.data = response.data.content.list
        this.pager = response.data.content.pager
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    },
    async doDelete(imageName) {
      try {
        return await api.delete(
          `/content/profile/${this.$route.params.id}/file/${imageName}`
        )
      } catch (error) {
        console.error('Error deleting data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    },
    async deleteAll() {
      try {
        await Promise.all(
          this.queue.map((imageName) => this.doDelete(imageName))
        )
        this.queue = []
        this.fetchData()
      } catch (error) {
        console.error('Error deleting data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    },
    async exportCSV() {
      try {
        return await api.get(
          `/content/profile/${this.$route.params.id}/export-csv`
        )
      } catch (error) {
        console.error('Error deleting data:', error)
        // Handle errors gracefully (e.g., show an error message to the user)
      }
    },
    GetImageSrc(imageName) {
      return `http://localhost:3000/api/v1/content/profile/${this.$route.params.id}/file/${imageName}`
    },
    SortList(list) {
      return list.sort((a, b) => a.localeCompare(b))
    },
    FilterQueue(list) {
      return list.filter((item) => !this.queue.includes(item))
    },
    AddToQueue(imageName) {
      if (!this.queue) {
        this.queue = []
      }
      this.queue.push(imageName)
      this.data = this.data.filter((item) => item !== imageName)
    },
    RemoveFromQueue(imageName) {
      if (this.queue) {
        this.queue = this.queue.filter((item) => item !== imageName)
        this.data.push(imageName)
      }
    }
  },
  watch: {
    $route() {
      this.data = null
      this.fetchData()
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
div.album {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

div.album ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

div.album ul li {
  display: inline-block;
  margin: 0 4px 0 0;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 3px;
  overflow: hidden;
}

div.album ul li img {
  width: 100px;
  height: 100px;
}
div.album ul li:hover {
  border: 2px solid #fff;
  cursor: pointer;
}
div.album ul li:active {
  border: 2px solid #c33;
  cursor: pointer;
}
div.pager {
  width: 100%;
  margin: 0;
  text-align: center;
  display: inline-block;
}
div.pager strong {
  border-radius: 3px;
  color: #ccc;
  background-color: #333;
  padding: 10px 20px;
}
div.pager a {
  border-radius: 3px;
  text-decoration: none;
  color: #999;
  padding: 10px 20px;
}
div.pager a:hover {
  color: #ccc;
  background-color: #333;
}
div.pager ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
div.pager ul li {
  display: inline-block;
  margin: 0;
  font-size: 10pt;
  font-weight: 600;
  padding: 5px 1px;
}
div.pager ul li:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
