<template>
  <div class="home">
    <input type="text" v-model="steamid" />
    <button @click="go_to_user_steam_stats()">Go!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steamid: ""
    };
  },
  methods: {
    go_to_user_steam_stats() {
      this.$router.push({
        name: "Steam_stats",
        params: { steamid: this.steamid }
      });
    }
  }
};
</script>
