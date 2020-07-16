<template>
  <div>
    <apexchart
      width="800"
      type="bar"
      :options="get_options()"
      :series="get_series()"
    >
    </apexchart>
  </div>
</template>
<script>
export default {
  props: ["gun_stats", "total_kills"],
  data() {
    return {
      options: {
        chart: {
          id: "gun-stats",
          foreColor: "#a4bdfe",
          fontFamily: "Raleway, sans-serif",
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "16px",
            },
          },
        },
        yaxis: {
          max: null,
          labels: {
            style: {
              fontSize: "16px",
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
          },
        },
        tooltip: {
          enabled: false,
        },
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Raleway, sans-serif",
            fontWeight: "600",
          },
        },
        colors: ["#78e5b1"],
        fontFamily: "Raleway, sans-serif",
        grid: {
          show: false,
        },
      },
      series: [
        {
          data: [],
        },
      ],
    };
  },
  methods: {
    top_5_guns_values() {
      const top5Values = Object.values(this.gun_stats)
        .sort((a, b) => b - a)
        .slice(0, 5);
      this.series[0].data = top5Values;
    },
    top_5_guns_names() {
      const top5Keys = Object.keys(this.gun_stats)
        .sort((a, b) => this.gun_stats[b] - this.gun_stats[a])
        .slice(0, 5);
      this.options.xaxis.categories = top5Keys;
    },
    set_total() {
      this.options.yaxis.max = this.series[0].data[0];
    },
    get_options() {
      this.set_total();
      this.top_5_guns_names();
      return this.options;
    },
    get_series() {
      this.top_5_guns_values();
      return this.series;
    },
  },
  mounted() {},
};
</script>
