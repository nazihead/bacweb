<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'App',
  created() {
    // console.log('app启动时')
    // if (localStorage.webpackTOKEN) {
    //   const decode = jwt_decode(localStorage.webpackTOKEN);
    //   console.log('app启动时',decode)
    //   this.$store.dispatch("changeLoginState", !this.isEmpty(decode));
    //   this.$store.dispatch("setUserInfo", decode);
    // }
  },
  methods: {
    // isEmpty(value) {
    //   return (
    //     value === undefined ||
    //     value === null ||
    //     (typeof value === "object" && Object.keys(value).length === 0) ||
    //     (typeof value === "string" && value.trim().length === 0)
    //   );
    // }
  }
}
</script>

<style>
.html,
.body,
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
</style>
