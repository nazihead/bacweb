<template>
    <div class="sidenavi">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#409eff">\
            <router-link to='./home'>
                <el-menu-item index="0">
                    <i class="fa fa-margin fa-server"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <template v-for='item in items'>
                <el-submenu v-if="item" :index="item.path" :key="item.path">
                    <template slot="title">
                    <i :class="'fa fa-margin '+ item.icon"></i>
                    <span>{{item.name}}</span>
                    </template>
                    <router-link  v-for="cItem in item.children"  :to="cItem.path" :key="item.path + cItem.path">
                        <el-menu-item v-if="item.children" :index="item.path + cItem.path">{{cItem.name}}</el-menu-item>
                    </router-link>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "side-nav",
    data() {
    return {
        dialogFormVisible:false,
        items: [
            {
            icon: "fa-money",
            name: "资金管理",
            path: "fund",
            children: [{ path: "productList", name: "资金流水" }]
            },
            {
            icon: "fa-asterisk",
            name: "信息管理",
            path: "info",
            children: [{ path: "infoShow", name: "个人信息" }]
            }
        ]
        };
    },
    
    components:{
    },
    methods: {
        openForm:()=>{

        },
        closeForm:()=>{
            
        }
    },
    mounted(){
        // console.log('年麻痹',this.name)
        // let temp = ''
        // setTimeout(()=>{
        //     temp =this.$store.state.userInfo.name
        //      console.log('111年麻痹',this.$store.state.userInfo.name)
        //     this.name=temp
        // },2000)
    }
}

</script>

<style scoped>
    .sidenavi{
        position: fixed;
        top: 81px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
        overflow: hidden;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
        }
        .el-menu-vertical-demo {
        width: 35px;
        }
        .fa-margin {
  margin-right: 5px;
  
}
.el-menu {
  border: none;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
</style>