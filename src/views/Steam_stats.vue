<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>your steam id is: {{ $route.params.steamid }}</h3>
    <a :href="user.url">{{ user.name }}</a>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    get_user() {
      axios
        .get("http://127.0.0.1:5000/howmuchtimehaveiwasted/76561198066000502")
        .then((response) => {
          this.user = response.data;
        })
        .catch((err) => {
          console.error("faILED!", err);
        });
    },
  },
  mounted() {
    this.get_user();
  },
};
</script>
