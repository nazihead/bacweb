<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
    <el-form :model="form" ref="formName" status-icon :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="类型" prop="type" >
            <el-select v-model="form.type" placeholder="请选择类型">
                <el-option
                    key="type1"
                    label="消费券"
                    value="消费券">
                </el-option>
                <el-option
                    key="type2"
                    label="抵用券"
                    value="抵用券">
                </el-option>
                <el-option
                    key="type3"
                    label="增值券"
                    value="增值券">
                </el-option>
                <el-option
                    key="type4"
                    label="折扣券"
                    value="折扣券">
                </el-option>
            </el-select>    
        </el-form-item>
        <el-form-item label="收入" prop="income">
        <el-input v-model="form.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
        <el-input v-model="form.expend" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="cash">
        <el-input v-model="form.cash" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
        <el-input v-model="form.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('formName')">确 定</el-button>
    </div>
    </el-dialog>
</template>    

<script>
  export default {
    props:{
        form:Object,
        
    },
    data() {
      return {
        title:'新增数据',
        dialogFormVisible: false,
        form:{
            type: '',
            cash: '',
            remark: '',
            income: '',
            expend: '',
            describe:''
            },
        rules:{
                type:[{required: true, message: "类型不能为空", trigger: "blur"}],
                cash:[{required: true, message: "余额不能为空", trigger: "blur"}],
                income:[{required: true, message: "收入不能为空", trigger: "blur"}],
                expend:[{required: true, message: "支出不能为空", trigger: "blur"}]
        },
        formLabelWidth: '120px'
      };
    },
    editIndex:Number,
    methods:{
        openForm(option){
            if (option.type=='edit'){
                this.title="编辑资料"
                this.editIndex = option.editIndex
            }
            this.form = option.form
            this.dialogFormVisible=true
        },
        closeForm(){
            this.dialogFormVisible=false
        },
        submit(formName){
            this.$refs[formName].validate((valid) =>{
                this.$emit('propssubmit',this.form,this.editIndex)
            })
        }
     },
     created(){
     }
  }
  
   
</script>