<template>
  <div id="app">
    <h1>HowMuchTimeHaveIWasted.com</h1>
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
  background-color: #171c24;
}

html {
  box-sizing: border-box;
}

*,
*:after,
*:before {
  box-sizing: inherit;
}

#app {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  padding-top: 40px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: calc(28px + 0.5vw);
  letter-spacing: 0.1em;
  color: #a3ffd3;
  text-shadow: 0px 0px 10px #78e5b1;
}

h2 {
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  letter-spacing: 0.05em;
  color: #78e5b1;
}

h3 {
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.05em;
  color: #da5bdd;
}

h4 {
  margin: 0;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #a4bdfe;
}

p {
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.05em;
  color: #a4bdfe;
}
</style>
