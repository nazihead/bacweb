<template>
    <div class="productshow">
        <div class="topdiv">
            <div class="top_left_div">
                <span>选择时间</span>
                <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type='primary' @click="selectData">筛选</el-button>
            </div>
            <div class="top_right_div">
                <el-button @click="addBtnClick"  type='primary' key='addbtn'>添加</el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                :fit="true"
                stripe
                border
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="date"
                label="日期"
                sortable
                align='center'
                :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                :filter-method="filterHandler"
                min-width="200">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{formatTime(scope.row)}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                prop="type"
                label="类型"
                align='center'
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="describe"
                label="描述"
                align='center'
                min-width="150">
                </el-table-column>
                <el-table-column
                prop="income"
                label="收入"
                align='center'
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="expend"
                label="支出"
                align='center'
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="cash"
                label="余额"
                align='center'
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="remark"
                align='center'
                label="备注"
                min-width="200">
                </el-table-column>
                <el-table-column 
                    label="操作"
                    
                    align='center'
                    min-width="250">
                >
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type='primary'
                    @click="toInfo(scope.$index, scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNo"
                        :page-sizes="[5, 10, 15]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <DialogForm ref='dialogForm' @propssubmit='submit'/>
    </div>
</template>
<script>
import moment from 'moment'
import DialogForm from '../components/DialogForm'

export default {
  name: "productshow",
  data(){
        return{
            tableData:[],
            value1:'',
            form: {
            type: '',
            cash: '',
            remark: '',
            income: '',
            expend: '',
            describe:''
            },
            pageNo:1,
            pageSize:10,
            total:0,
           type:'add',
        }
  },
  computed:{

  },
  components:{
      DialogForm
  },
  methods:{
       handleSizeChange(val) {
            this.getProducts(1,val)
        },
          // 显示第几页
        handleCurrentChange(val) {
            this.getProducts(val, this.pageSize)
        },
      selectData(){
          console.log('12313',moment(this.value1[0]).format("X"))
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      toInfo(index,row){
        this.$router.push(`/productinfo/${row._id}`)
      },
      addBtnClick:function(){
          this.type='add'
           this.form={
            type: '',
            cash: '',
            remark: '',
            income: '',
            expend: '',
            describe:''
            }
          this.$refs.dialogForm.openForm({
              type:this.type,
              form:JSON.parse(JSON.stringify(this.form)) 
              
          })
      },
      addDate(data){
          this.$axios.post('api/profile/addprofile',data)
            .then(
                res=>{
                    if(res.data){
                            let tempdata = res.data
                            this.$refs.dialogForm.closeForm()
                            this.$message("编辑成功");
                            $this.$nextTick()
                            .then(
                                this.tableData.unshift(tempdata)
                            )
                    }
                    
                }
            ).catch(err=>{
                console.log('err',err)
            })
      },
      editData(data,index){
          console.log('data',index,data)
          this.$axios.post(`api/profile/editprofile/?id=${data._id}`,data)
            .then(
                res=>{
                    if(res.data){
                            let tempdata =JSON.parse(JSON.stringify(this.tableData)) 
                            tempdata[index]=data
                            console.log('tempdata',tempdata)
                            
                            this.$refs.dialogForm.closeForm()
                            this.$message("编辑成功");
                            setTimeout(()=>{
                                this.tableData=tempdata
                                
                            },100)
                    }
                    
                }
            ).catch(err=>{
                console.log('err',err)
            })
      },
      submit(data,index){
          if(this.type == 'edit'){
              this.editData(data,index)
          }else{
              this.addDate(data)
          }
          
      },
      handleDelete(index,item){
           this.$axios.delete(`api/profile/deleteprofile/${item._id}`)
            .then(
                res=>{
                    if(res.data){
                        this.$message("删除成功");
                        this.getProducts()
                    }
                    
                }
            ).catch(err=>{
                console.log('err',err)
            })
      },
      handleEdit(index,data){
             this.type="edit"
            this.form=data
            this.$refs.dialogForm.openForm({
                type:this.type,
                form:JSON.parse(JSON.stringify(this.form)),
                editIndex:index
            })

      },
      
      getProducts(index,size){
          this.$axios.get(`api/profile/?pageNo=${index}&pageSize=${size}`)
            .then(
                res=>{
                        let tempdata = res.data
                        this.pageSize=size
                        this.pageNo=index
                        this.tableData=tempdata.profile
                        this.total=tempdata.total
                }
            ).catch(err=>{
                console.log('err',err)
            })
      },
      formatTime(row){
          return moment(parseInt(row.date)).format('YYYY/MM/DD HH:mm:ss')
      }
  },
  mounted(){
      this.getProducts(1,this.pageSize)
    //   for(let i=1;i<100;i++){
    //       setTimeout(()=>{
    //           this.count+=1
    //           console.log(i)
    //        this.$axios.post('api/profile/addprofile',{
    //             type: '消费券',
    //             cash: '1000',
    //             remark: '',
    //             income: '' + (i*10 +1000),
    //             expend: '1000',
    //             describe:''
    //        })
    //         .then(
    //             res=>{
    //                 if(res.data){
    //                 }
                    
    //             }
    //         ).catch(err=>{
    //             console.log('err',err)
    //         })
    //   },1000)
    //   }
  }
};
</script>
<style scoped>
.productshow {
  /* padding: 16px; */
}
.topdiv{
    width: 100%;
    margin-top:40px;
    height: 60px;
}
.top_left_div{
    position: absolute;
    margin-left: 20px;
}
.top_right_div{
    float: right;
    margin-right: 20px;
}
.table{
    width: 100%;
    height: 60%;
}
</style>
