<template>
    <div class="headernavi">
        <div class="left">
            <img class="logo" src="../assets/logo.png" alt="">
            <span class="title">新一点后台管理系统</span>
        </div>
        <div class="right">
            <img src="../assets/logo.png" class='avatar' alt="">
                <div class='welcome'>
                <p class='name comename'>欢迎</p>
                <p class='name avatarname'>{{userInfo.name}}</p>
            </div>
            <span class='username'>
            <el-dropdown
                    trigger="click"
                    @command='setDialogInfo'>
                <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                    <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "head-nav",
    computed:{
       userInfo(){
        return this.$store.state.userInfo
    }
    },
    
    components:{
    },
    methods: {
        setDialogInfo(cmditem) {
        if (!cmditem) {
            console.log("test");
            this.$message("菜单选项缺少command属性");
            return;
        }
        switch (cmditem) {
            case "info":
            this.showInfoList();
            break;
            case "logout":
            this.logout();
            break;
        }
        },
        showInfoList() {
        // 个人信息
        this.$router.push("/infoShow");
        },
        logout() {
        // 清除token
        localStorage.removeItem("webpackTOKEN");
        this.$store.dispatch("clearCurrentState");

        // 页面跳转
        this.$router.push("/login");
        }
    },
}

</script>

<style scoped>
    .headernavi{
        height: 80px;
        width:  100%;
        min-width: 600px;
        background: #324057;
        color: #fff;
        border-bottom: 1px solid #1f2d3d;
        display: table;
    }
    .left{
        height: 80px;
        float: left;
    }
    .logo{
        height: 50px;
        width: 50px;
        margin: 0px 5px;
        vertical-align: middle;
        display: inline-block;
    }
    .title{
        vertical-align: middle;
         font-size: 22px;
        letter-spacing: 3px;
        line-height: 80px;
    }
    .right{
        float: right;
        margin-right: 11px;
    }
    .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
    }
    .welcome {
    display: inline-block;
    line-height: 10px;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
    height: 80px;
    }
    .name {
    text-align: center;
    font-size: 14px;
    }
    .comename {
    font-size: 12px;
    }
    .avatarname {
    color: #409eff;
    font-weight: bolder;
    }
    .username {
    cursor: pointer;
    margin-right: 5px;
    }
    .el-dropdown {
    color: #fff;
    }
   
</style>