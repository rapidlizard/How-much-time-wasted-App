<template>
  <div>
    <div v-if="failed" class="not-found">
      <h2>404</h2>
      <h3>This user was not found :(</h3>
    </div>
    <div v-if="loading" class="loader">
      <sync-loader
        :loading="loading"
        color="#78e5b1"
        size="20px"
        class="loader"
      ></sync-loader>
    </div>
    <div class="steam-stats" v-if="!loading && !failed">
      <section class="user">
        <img :src="user.img" alt="" />
        <div class="user-info">
          <a :href="user.url">{{ user.name }}</a>
          <p>Joined steam in {{ moment(user.created * 1000).format("Y") }}</p>
        </div>
      </section>

      <section class="results">
        <div>
          <h3>
            You have wasted <span>{{ user.total_hours }}</span> hours
          </h3>
          <p>Thats {{ user.total_days }} days!</p>
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
            :total="user.csgo_stats.total_kills"
          >
            <div>
              <h4>Headshots:</h4>
              <span class="hours">{{
                user.csgo_stats.headshot_percentage
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

        <div class="graph">
          <h3>Top 5 guns by kills</h3>
          <gun-stats
            :total_kills="user.csgo_stats.total_kills"
            :gun_stats="user.csgo_stats.gun_stats"
          ></gun-stats>
        </div>

        <div class="minor-stats">
          <h3 class="minor-stats-title">Other Stats</h3>
          <div class="row">
            <div class="stat">
              <h4>MVPs</h4>
              <span>{{ user.csgo_stats.mvps }}</span>
            </div>
            <div class="stat">
              <h4>Hours played</h4>
              <span>{{ user.csgo_stats.hours }}</span>
            </div>
            <div class="stat">
              <h4>Money earned</h4>
              <span>${{ user.csgo_stats.money_earned }}</span>
            </div>
          </div>
          <div class="row">
            <div class="stat">
              <h4>Knife kills</h4>
              <span>{{ user.csgo_stats.knife_kills }}</span>
            </div>
            <div class="stat">
              <h4>Money earned</h4>
              <span>${{ user.csgo_stats.money_earned }}</span>
            </div>
            <div class="stat">
              <h4>Rounds won</h4>
              <span>{{ user.csgo_stats.total_wins }}</span>
            </div>
          </div>
          <div class="row">
            <div class="stat">
              <h4>Planted Bombs</h4>
              <span>{{ user.csgo_stats.planted_bombs }}</span>
            </div>
            <div class="stat">
              <h4>Rescued hostages</h4>
              <span>{{ user.csgo_stats.rescued_hostages }}</span>
            </div>
            <div class="stat">
              <h4>Defused Bombs</h4>
              <span>{{ user.csgo_stats.defused_bombs }}</span>
            </div>
          </div>
          <div class="last-row">
            <div class="stat">
              <h4>Dominations</h4>
              <span>{{ user.csgo_stats.dominations }}</span>
            </div>
            <div class="stat">
              <h4>Revenges</h4>
              <span>{{ user.csgo_stats.revenges }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GunStats from "../components/GunStats.vue";
import SyncLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    GunStats,
    SyncLoader,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      donutSettings: {
        background: "#171c24",
        thickness: 10,
        size: 200,
      },
      loading: false,
      failed: false,
      kdRatioValues: [],
      accuracyValues: [],
      hoursValues: [],
    };
  },
  methods: {
    get_user() {
      this.loading = true;
      axios
        .get(
          "http://127.0.0.1:5000/howmuchtimehaveiwasted/" +
            this.$route.params.steamid
        )
        .then((response) => {
          console.log("it did something");
          this.user = response.data;
          this.set_donut_charts_values(response.data);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.failed = true;
          this.loading = false;
        });
    },
    set_donut_charts_values(user) {
      this.kdRatioValues = [
        { value: user.csgo_stats.total_kills, color: "#7DD23A" },
        { value: user.csgo_stats.total_deaths, color: "#4F5E74" },
      ];
      this.accuracyValues = [
        { value: user.csgo_stats.shots_hit, color: "#D64C4C" },
        { value: user.csgo_stats.shots_fired, color: "#4F5E74" },
      ];
      this.hoursValues = [
        { value: user.csgo_stats.headshots, color: "#D2A83A" },
        {
          value: user.csgo_stats.total_kills - user.csgo_stats.headshots,
          color: "#4F5E74",
        },
      ];
    },
  },
  mounted() {
    if (!this.user) {
      this.get_user();
    }
    if (this.user) {
      this.set_donut_charts_values(this.user);
    }
  },
};
</script>
<style lang="scss">
.not-found {
  width: 800px;
  position: absolute;
  bottom: 500px;
  color: #d64c4c;
  text-align: center;
  margin: 5px 20px 0 0;
  h2 {
    color: #d64c4c;
    font-size: 46px;
    margin-bottom: 50px;
  }
  h3 {
    font-size: 24px;
    color: #a4bdfe;
  }
}
.loader {
  margin-top: 50px;
  text-align: center;
}
.steam-stats {
  padding-top: 80px;
  .user {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50px 50px 10px 50px;
      margin-right: 10px;
    }
    .user-info {
      align-items: baseline;
      margin-top: 40px;
      font-weight: 500;
      line-height: 26px;
      letter-spacing: 0.05em;
      color: #a4bdfe;

      a {
        font-size: 36px;
        color: #a4bdfe;
      }
      p {
        padding-top: 5px;
        font-size: 18px;
        color: #a4bdfe;
      }
    }
  }
  .results {
    text-align: center;
    margin-bottom: 100px;
    h2 {
      margin-bottom: 10px;
      color: #73d0ee;
    }
    h3 {
      margin-bottom: 10px;
      span {
        color: #d76bd9;
      }
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
      margin-bottom: 100px;
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
    .graph {
      margin-bottom: 100px;
      h3 {
        font-size: 28px;
        font-weight: 300;
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .minor-stats {
      h3 {
        font-size: 28px;
        font-weight: 300;
        text-align: center;
        margin-bottom: 50px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        .stat {
          width: 200px;
          text-align: center;
          h4 {
            color: #73d0ee;
            margin-bottom: 10px;
          }
          span {
            color: #a4bdfe;
          }
        }
      }
      .last-row {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 50px;
        .stat {
          width: 200px;
          text-align: center;
          h4 {
            color: #73d0ee;
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
