<template>
  <div class="steam-stats">
    <section class="header">
      <img :src="user.img" alt="" />
      <a :href="user.url">{{ user.name }}</a>
    </section>

    <section class="results">
      <div>
        <h3>You have wasted {{ user.total_hours }} hours</h3>
        <p>Thats {{ user.total_hours / 24 }} days!</p>
      </div>
      <div>
        <h2>{{ user.rating.title }}</h2>
        <p>{{ user.rating.description }}</p>
      </div>
      <div>
        <h3>Your score: {{ user.score }}</h3>
      </div>
    </section>

    <section class="csgo-stats">
      <h2>Your CSGO stats</h2>

      <div class="main-stats">
        <div>
          <h4>Accuracy:</h4>
          <span class="accuracy">{{ user.csgo_stats.accuracy }}</span>
        </div>
        <div>
          <h4>Hours:</h4>
          <span class="hours">{{ user.csgo_stats.hours / 60 / 24 }}</span>
        </div>
        <div>
          <h4>KD Ratio:</h4>
          <span class="kd-ratio">{{ user.csgo_stats.kd_ratio }}</span>
        </div>
      </div>
    </section>
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
        .get(
          "http://127.0.0.1:5000/howmuchtimehaveiwasted/" +
            this.$route.params.steamid
        )
        .then((response) => {
          this.user = response.data;
        });
    },
  },
  mounted() {
    this.get_user();
  },
};
</script>
<style lang="scss">
.steam-stats {
  padding-top: 80px;
  .header {
    margin-bottom: 60px;
    a {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: 0.05em;
      color: #a4bdfe;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px 50px 10px 50px;
    }
  }
  .results {
    text-align: center;

    div {
      margin-bottom: 60px;
    }
  }
  .csgo-stats {
    padding-top: 20px;
    h2 {
      text-align: center;
      margin-bottom: 100px;
    }
    .main-stats {
      display: flex;
      justify-content: space-between;
      div {
        width: 200px;
        text-align: center;
        span {
          font-size: 24px;
        }
        .accuracy {
          color: #d64c4c;
        }
        .hours {
          color: #d2a83a;
        }
        .kd-ratio {
          color: #7dd23a;
        }
      }
    }
  }
}
</style>
