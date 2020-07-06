<template>
  <div class="register">
      <section class="form_container">
           <span class='title'>新一点后台管理系统</span>
            <div class="tip">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit" type="primary" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                    <div class="registerArea">
                        <p>还没有账号？现在<router-link class="routerlink" to="/register">注册</router-link></p>
                    </div>
                </el-form>  
          </div>
          <div class="table"></div>
      </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name:"login",
    data(){
        return{
            loginForm:{
                email:"",
                password:"",
            },
            rules:{
                email: [
                {
                    type: "email",
                    required: true,
                    message: "邮箱格式不正确",
                    trigger: "blur"
                }
                ],
                password: [
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ],
            }
            }
        },
    compontents:{
       
    },
    methods:{
        submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('1231',this.$loading)
            // this.$loading()
            
            this.$axios.post('api/users/login',this.loginForm)
            .then(
                res=>{
                    const token = res.data.token
                    localStorage.setItem('webpackTOKEN',token)
                    // console.log('解析token',jwt_decode(token)) 
                    this.$router.push("/index")
                    //获取用户信息
                    this.$axios.get('api/users/userInfo')
                    .then(
                        res=>{
                            console.log('获取到的用户信息',res.data)
                             this.$store.dispatch('changeLoginState',true)
                            this.$store.dispatch('setUserInfo',res.data)
                        }
                    ).catch(err=>{
                        console.log('捕获错误',err)
                    })
                }
            ).catch(err=>{
                console.log('捕获错误',err)
            })
            } else {
                console.log('error submit!!');
                return false;
            }
            })
        },
    }
}
</script>

<style scoped>
    .register{
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }
    .form_container{
        width: 370px;
        height: 210px;
        position: absolute;
        margin-left: 50%;
        margin-top: 10%;
        transform: translateX(-50%);   
        text-align: center; 
    }
    .title{
        color: white;
        font-size: 24px;
    }
    .tip{
        background-color: white;
        margin-top: 20px;
        border-radius: 15px;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }
    .submit{
        width: 100%;
    }
    .registerArea{
        text-align: right;
        font-size: 14px;
    }
    .routerlink{
        color: blue;
    }
</style>