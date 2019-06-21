<template>
  <div class="strategy">
    <div class="headerWrapper">
      <top-bar :msg="'strategy'"></top-bar>
    </div>
    <div class="container">
        <ul class="pic-tab">
          <li :class="{'active': tabNum === 1}" @click="tabNum=1"></li>
          <li :class="{'active': tabNum === 2}" @click="tabNum=2"></li>
          <li :class="{'active': tabNum === 3}" @click="tabNum=3"></li>
          <li :class="{'active': tabNum === 4}" @click="tabNum=4"></li>
        </ul>
        <div class="main" v-if="tabNum === 1">
          <el-row :gutter="20">
            <el-col :span="5">
                <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                @select="handleSelect"
                text-color="#000"
                active-text-color="#1D695B">
                <el-menu-item index="1">信息服务咨询</el-menu-item>
                <el-menu-item index="2">信息设备修理维护</el-menu-item>
                <el-menu-item index="3">信息系统测试</el-menu-item>
                <el-menu-item index="4">信息系统监理</a></el-menu-item>
                <el-menu-item index="5">信息系统推广建设</a></el-menu-item>
                <el-menu-item index="6">信息系统日常维护</a></el-menu-item>
                <el-menu-item index="7">信息系统完善性维护</a></el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="19" class="message-content">
              <div class="message" v-if="activeIndex == '1'">
                  <div class="message-item"> 
                    <h4>注册资本要求</h4>
                    <p class="message-item-ans">
                      500万及以上 
                    </p>
                     <el-divider></el-divider>         
                  </div>
                  <div class="message-item"> 
                    <h4>业绩要求</h4>
                    <p class="message-item-ans">
                      近一年（从2017年1月1日至递交投标文件当天）有200万或以上同类物资的供货业绩, 
                      须提供同一项目的中标通知书、发票及供货合同复印件，合同中对应采购标的物
                      资金额不得涂抹，如有涂抹情况不计入有效业绩统计。 
                    </p>
                     <el-divider></el-divider>         
                  </div>
                  <div class="message-item"> 
                    <h4>投资人资格要求</h4>
                    <p class="message-item-ans">
                      近一年（从2017年1月1日至递交投标文件当天）有200万或以上同类物资的供货业绩, 
                      须提供同一项目的中标通知书、发票及供货合同复印件，合同中对应采购标的物
                      资金额不得涂抹，如有涂抹情况不计入有效业绩统计。 
                    </p>
                     <el-divider></el-divider>         
                  </div>
                  <div class="message-item"> 
                    <h4>检测或试验报告要求</h4>
                    <p class="message-item-ans">
                      近一年（从2017年1月1日至递交投标文件当天）有200万或以上同类物资的供货业绩, 
                      须提供同一项目的中标通知书、发票及供货合同复印件，合同中对应采购标的物
                      资金额不得涂抹，如有涂抹情况不计入有效业绩统计。 
                    </p>       
                  </div>               
              </div>  
              <div class="message" v-if="activeIndex == '2'"></div>          
            </el-col>
          </el-row>  
        </div>
        <div v-if="tabNum === 2">
          这是营销类的
        </div>
        <div v-if="tabNum === 3">
          这是生产类的
        </div>
        <div v-if="tabNum === 4">
          这是基建类的
        </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@c/Topbar/index.vue";
export default {
  name:"Strategy",
  components: {
        TopBar
    },
    props:{
      msg:{
        type:String
      }
    },
    data(){
      return{
        tabNum: 1,
        activeIndex: '1',
      }
    },
    methods:{
       handleSelect(key, keyPath) {
        this.activeIndex = key
        console.log(this.activeIndex)
      }
    },
    mounted(){
      console.log(this.msg)
    }
}
</script>
<style scoped>
  @import url('~@/style/index.css');
</style>
<style lang="less" scoped>
.strategy{
  overflow-y: hidden;
  height: 100%;
  .container{
    .pic-tab{
      overflow: hidden;
      li{
        height: 140px;
        width: 250px;
        float: left;
        margin-right: 66px;
        margin-top: 40px;
        box-sizing: border-box;
        cursor: pointer;
        &:first-child{
          background: url('~@a/images/strategy_1.png') no-repeat;
        }
        &:nth-child(2){
          background: url('~@a/images/strategy_2.png') no-repeat;
        }
        &:nth-child(3){
          background: url('~@a/images/strategy_3.png') no-repeat;
        }
        &:last-child{
          margin-right: 0;
          background: url('~@a/images/strategy_4.png') no-repeat;
        }
        &.active{
            border-bottom: 6px solid #1D695B;
        }
      }
    }
    .main{
      margin-top: 40px;
      .message-content{
        padding-top: 10px;
        box-sizing: border-box;
        background: #fff;
        width: 77%;
        float: right;
        padding-left: 0!important;
        .message-item{
          margin-top: 20px;
          text-align: left;
          h4{
            padding-left: 30px;
            height:22px;
            line-height: 22px;
            position: relative;
            &::before{
              content: '';
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              width:5px;
              height:22px;
              background:linear-gradient(313deg,rgba(29,105,91,1) 0%,rgba(68,155,119,1) 100%);
            }
          }
          .message-item-ans{
            font-size: 14px;
            padding: 15px 30px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
  
</style>

