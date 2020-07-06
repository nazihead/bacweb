<template>
    <div class="productInfo">
        <div id="echarts"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: "productInfo",
    data() {
        return {
            data:{
                "_id":"",
                "type":"",
                "describe":"",
                "income":0,
                "expend":0,
                "cash":0,
                "remark":"",
                "date":""
                ,"__v":0
            }
        }
    },
    computed:{
    },
    watch: {
      //观察option的变化
      data: {
        handler(newVal, oldVal) {
            console.log(123456,newVal,oldVal)
            this.init();
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    methods:{
        chransOption(){
            console.log('1234564',this.data.income,this.data.expend,this.data.cash,this.data)
            return {
                series : [
                    {
                        name: '资金概况',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:this.data.income, name:'收入'},
                            {value:this.data.expend, name:'支出'},
                            {value:this.data.cash, name:'现金'},
                        ],
                        roseType: 'angle',
                        itemStyle: {
                            normal: {
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },
        init(){
            var myChart = echarts.init(document.getElementById('echarts'));
            // 绘制图表
            const option = this.chransOption()
            console.log('option',option)
            myChart.setOption(option);
        }
    },
    mounted(){
        this.init()
       this.$axios.get(`api/profile/${this.$route.params.id}`)
        .then(
            res=>{
                if(res.data.data){
                    this.data=res.data.data
                }
            }
        ).catch(err=>{
            console.log('err',err)
        })
    }
}

</script>

<style scoped>
    .productInfo{
        width: 100%;
        height: 100%;
    }
    #echarts{
        position: relative;
         width: 50%;
        height: 50%;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
</style>