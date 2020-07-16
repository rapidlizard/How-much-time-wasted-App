<template>
  <div class="home">
    <div class="steamid-form">
      <label>Enter your steam id:</label>
      <div class="input-bar">
        <input type="text" v-model="steamid" />
        <button @click="get_user()">GO!</button>
      </div>
      <label v-if="failed == true" class="failed">There was a problem :(</label>
    </div>
    <div class="site-description">
      <h3>What does this do?</h3>
      <p>
        This is a simple app to get you depressed by showing you how much time
        you wasted on steam and csgo. It also show some of your csgo stats if
        your into that kind of stuff.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      failed: false,
      steamid: "",
      user: {},
    };
  },
  methods: {
    get_user() {
      axios
        .get("http://127.0.0.1:5000/howmuchtimehaveiwasted/" + this.steamid)
        .then((response) => {
          this.user = response.data;
          this.go_to_user_steam_stats();
        })
        .catch((error) => {
          console.log(error);
          this.failed = true;
        });
    },
    go_to_user_steam_stats() {
      this.$router.push({
        name: "Steam_stats",
        params: { steamid: this.steamid, user: this.user },
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
  .failed {
    color: #d64c4c;
    text-align: right;
    font-size: 16px;
    margin: 5px 20px 0 0;
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
.site-description {
  padding-top: 200px;
  text-align: center;
  h3 {
    margin-bottom: 10px;
  }
}
</style>
