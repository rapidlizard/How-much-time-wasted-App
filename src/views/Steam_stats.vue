<template>
  <div class="steam-stats" v-if="!loading">
    <section class="user">
      <img :src="user.img" alt="" />
      <div class="user-info">
        <a :href="user.url">{{ user.name }}</a>
        <p>{{ moment(user.created * 1000).toNow(true) }} old</p>
      </div>
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
        <h3>Your Score</h3>
        <p>{{ user.score }}</p>
      </div>
    </section>

    <section class="csgo-stats">
      <h2>Your CSGO stats</h2>

      <div class="main-stats">
        <vc-donut
          :sections="accuracyValues"
          :background="donutSettings.background"
          :thickness="donutSettings.thickness"
          :size="donutSettings.size"
          :total="user.csgo_stats.shots_fired + user.csgo_stats.shots_hit"
        >
          <div>
            <h4>Accuracy:</h4>
            <span class="accuracy">{{ user.csgo_stats.accuracy }}</span>
          </div>
        </vc-donut>
        <vc-donut
          :sections="hoursValues"
          :background="donutSettings.background"
          :thickness="donutSettings.thickness"
          :size="donutSettings.size"
          :total="user.total_hours"
        >
          <div>
            <h4>Hours:</h4>
            <span class="hours">{{
              (user.csgo_stats.hours / 60 / 24).toFixed()
            }}</span>
          </div>
        </vc-donut>

        <vc-donut
          :sections="kdRatioValues"
          :background="donutSettings.background"
          :thickness="donutSettings.thickness"
          :size="donutSettings.size"
          :total="user.csgo_stats.total_kills + user.csgo_stats.total_deaths"
        >
          <div>
            <h4>KD Ratio:</h4>
            <span class="kd-ratio">{{ user.csgo_stats.kd_ratio }}</span>
          </div>
        </vc-donut>
      </div>

      <div class="minor-stats">
        <div class="row">
          <div class="stat">
            <h3>MVPs</h3>
            <span>{{ user.csgo_stats.mvps }}</span>
          </div>
          <div class="stat">
            <h3>Money earned</h3>
            <span>${{ user.csgo_stats.money_earned }}</span>
          </div>
          <div class="stat">
            <h3>Knife Kills</h3>
            <span>{{ user.csgo_stats.knife_kills }}</span>
          </div>
        </div>
        <div class="row">
          <div class="stat">
            <h3>Planted Bombs</h3>
            <span>{{ user.csgo_stats.planted_bombs }}</span>
          </div>
          <div class="stat">
            <h3>Rounds won</h3>
            <span>{{ user.csgo_stats.total_wins }}</span>
          </div>
          <div class="stat">
            <h3>Defused Bombs</h3>
            <span>{{ user.csgo_stats.defused_bombs }}</span>
          </div>
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
      loading: true,
      donutSettings: {
        background: "#171c24",
        thickness: 10,
        size: 200,
      },
      user: {},
      kdRatioValues: [],
      accuracyValues: [],
      hoursValues: [],
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
          this.loading = false;
          this.set_donut_charts_values(response.data);
          this.user = response.data;
        });
    },
    set_donut_charts_values(user) {
      this.kdRatioValues = [
        { value: user.csgo_stats.total_deaths, color: "#7DD23A" },
        { value: user.csgo_stats.total_kills, color: "#4F5E74" },
      ];
      this.accuracyValues = [
        { value: user.csgo_stats.shots_hit, color: "#D64C4C" },
        { value: user.csgo_stats.shots_fired, color: "#4F5E74" },
      ];
      this.hoursValues = [
        { value: user.csgo_stats.hours / 60 / 24, color: "#D2A83A" },
        {
          value: user.total_hours - user.csgo_stats.hours / 60 / 24,
          color: "#4F5E74",
        },
      ];
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
  .user {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50px 50px 10px 50px;
      margin-right: 10px;
    }
    .user-info {
      display: flex;
      align-items: baseline;
      margin-top: 65px;
      font-weight: 500;
      line-height: 26px;
      letter-spacing: 0.05em;
      color: #a4bdfe;

      a {
        font-size: 36px;
        color: #a4bdfe;
        margin-right: 10px;
      }
      p {
        font-size: 18px;
        color: #a4bdfe;
      }
    }
  }
  .results {
    text-align: center;
    margin-bottom: 80px;
    h2 {
      color: #73d0ee;
    }
    div {
      margin-bottom: 60px;
    }
  }
  .csgo-stats {
    padding-top: 20px;
    margin-bottom: 50px;
    h2 {
      text-align: center;
      margin-bottom: 50px;
    }
    .main-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      div {
        text-align: center;
        h4 {
          text-align: center;
        }
        span {
          font-weight: 600;
          font-size: 24px;
        }
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
    .minor-stats {
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        .stat {
          width: 200px;
          text-align: center;
          h3 {
            margin-bottom: 10px;
          }
          span {
            color: #a4bdfe;
          }
        }
      }
    }
  }
}
</style>
