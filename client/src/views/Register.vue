<template>
  <div class="register">
      <section class="form_container">
           <span class='title'>新一点后台管理系统</span>
            <div class="tip">
                <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="registerForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份">
                        <el-select v-model="registerForm.identity" placeholder="请选择">
                            <el-option
                                key="manager0"
                                label="管理员"
                                value="manager">
                            </el-option>
                            <el-option
                                key="nomal0"
                                label="员工"
                                value="nomal">
                            </el-option>
                        </el-select>    
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit" type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>  
          </div>
          <div class="table"></div>
      </section>
  </div>
</template>

<script>
export default {
    name:"register",
    
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return{
            registerForm:{
                name:"",
                email:"",
                password:"",
                checkPass:"",
                identity:"",
            },
            rules:{
                name: [
                    { required: true, message: "用户名不能为空", trigger: "change" },
                    { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                ],
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
                checkPass: [
                { required: true, message: "确认密码不能为空", trigger: "blur" },
                {
                    min: 6,
                    max: 30,
                    message: "长度在 6 到 30 个字符",
                    trigger: "blur"
                },
                { validator: validatePass2, trigger: "blur", trigger: "blur"  }
                ],
                identity:{
                    required:true,message:"请选择身份"
                }
                
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
            
            this.$axios.post('api/users/register',this.registerForm)
            .then(
                data=>{
                    this.$message({
                    message: '注册成功',
                    type: 'success'
                    });
                    this.$router.push("/login")
                }
            ).catch(err=>{
                console.log(err)
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
</style>