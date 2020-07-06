<template>
  <div class="index">
    <HeadNav></HeadNav>
    <SideNav />
    <router-view class="router_area"></router-view>
  </div>
  
</template>

<script>
import HeadNav from '../components/HeadNav'
import SideNav from '../components/SideNav'
export default {
    name:"indexView",
    components:{
        HeadNav,
        SideNav
    },
     created(){
        // 获取用户信息
        this.$axios.get('api/users/userInfo')
        .then(
            res=>{
                console.log('获取到的用户信息',res.data)
                if(res.data.status == 403){
                    // 清除token
                    localStorage.removeItem("webpackTOKEN");
                    this.$store.dispatch("clearCurrentState");

                    // 页面跳转
                    this.$router.push("/login");
                    return
                }
                this.$store.dispatch('changeLoginState',true)
                this.$store.dispatch('setUserInfo',res.data)
            }
        ).catch(err=>{
            console.log('捕获错误',err)
        })
    }
}
</script>

<style scoped>
    .index{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .router_area{
        position: relative;
        top: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 81px);
            }
</style>