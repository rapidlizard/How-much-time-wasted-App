<template>
  <div class="home">
    <div class="steamid-form">
      <label>Enter your steam id:</label>
      <div class="input-bar">
        <input type="text" v-model="steamid" />
        <button @click="go_to_user_steam_stats()">GO!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steamid: "",
    };
  },
  methods: {
    go_to_user_steam_stats() {
      this.$router.push({
        name: "Steam_stats",
        params: { steamid: this.steamid },
      });
    },
  },
};
</script>
<style lang="scss">
.steamid-form {
  display: block;
  width: 370px;
  margin: 0 auto;
  padding-top: 150px;
  label {
    display: block;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 21px;
    color: #78e5b1;
    margin-bottom: 10px;
  }
  .input-bar {
    position: relative;
    input {
      padding: 0 10px;
      height: 40px;
      width: 350px;
      font-family: "Raleway", sans-serif;
      font-size: 18px;
      color: #a4bdfe;
      background: #171c24;
      border: 3px solid #78e5b1;
      border-radius: 0px 10px 10px 10px;

      &:focus {
        outline: none;
      }
    }
    button {
      position: absolute;
      right: 20px;
      width: 45px;
      height: 40px;
      font-family: "Raleway", sans-serif;
      font-size: 18px;
      background: #78e5b1;
      border: none;
      border-radius: 10px 10px 0px 10px;
    }
  }
}
</style>
