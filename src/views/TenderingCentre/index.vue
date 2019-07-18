<template>
  <div class="centre">
    <div class="headerWrapper">
      <top-bar :msg="'centre'" :pageNo="pageNo" @clear="updateComponent" :pageSize="pageSize" :pClass="pClass"></top-bar>
    </div> 
    <el-scrollbar style="height:100%;" > 
      <div class="container container-centre"> 
          <div v-if="uploadStatus == 2">
              <h4 class="upload-title">上传招标方案</h4>
              <el-upload
                class="upload-demo"
                drag
                :action="url"  
                accept=".doc,.docx"
                :before-upload="beforeUpload"
                :on-progress="progressUpload"
                :on-success="successUpload"
                :show-file-list="false"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__text">(只能上传doc/docx文件)</div>
              </el-upload>
              <el-dialog
                :visible.sync="isShowProgress"
                :close-on-click-modal="true"
                :show-close="false"
                width="30%"
                multiple
                class="progressDialog"
                >
                <el-progress :text-inside="true" :stroke-width="24" :percentage="nowPercent" :status="nowPercent == 100? 'success': 'warning'"></el-progress>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" v-if="nowPercent < 100">正在校验</el-button>
                </span>
              </el-dialog>
          </div>         
           
            <div class="biding_container" v-show="biddingInfo.bList">
                <h4 class="compare_top">标的清单</h4>
                <ul class="underlying">
                  <li v-for="(item,index) in biddingInfo.bList" @click="handleBlist(item.bId , item.bName)" :key="index"><el-tag :type="bId ==item.bId? 'success':'info'">{{item.bName}}</el-tag></li>
                </ul>
                <div class="compareBox" v-show="compareBoxflag">
                    <div class="compare_item">
                      <div class="compare_item_title">是否公开招标:</div>
                      <div class="compare_item_content">{{ nowBidding.bOpen | openStatusFmt}}</div>
                    </div>
                    <div class="compare_item">
                      <div class="compare_item_title">标的名称:</div>
                      <div class="compare_item_content" v-text="nowBidding.bName"></div>
                    </div>
                    <div class="compare_item">
                      <div class="compare_item_title">策略库匹配:</div>
                      <div class="compare_item_content">
                        <p class="success_color">已为您匹配到最接近策略-{{strategyTop1.strategyDept}} 策略相似度{{strategyTop1.similaruty | percentStatusFmt}}</p>
                        <p class="remind_color">(您也可以在下方选择查看其他策略库对比结果)</p>
                      </div>
                    </div>
                    <div class="compare_item">
                      <div class="compare_item_title">是否符合标包策略:</div>
                      <div class="compare_item_content error_color">{{ strategyTop1.same | strategyStatusFmt}}</div>
                    </div>
                </div>
                <h4 class="compare_top" v-show="compareBoxflag">对比结果TOP5</h4>
                <div class="compare_top_box" v-show="compareBoxflag" >
                  <div id="myChart" v-loading="chartLoading" :style="{width: '1000px', height: '300px'}"></div>
                </div>
                <h4 class="compare_top" v-show="compareBoxflag">手动选择对比策略</h4>
                <div class="block" v-show="compareBoxflag">
                  <el-cascader
                    v-model="value"
                    size="medium"
                    :options="strategyTreeOption"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                    placeholder="请选择对比策略类别"
                  >
                  </el-cascader>
                </div>  
                <h4 class="compare_top" v-show="compareBoxflag">审核比对结果:</h4>
                <div class="compare_result" v-show="compareBoxflag">
                  <el-row :gutter="20">
                    <el-col :span="5">
                      <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        @select="formSelect"
                        text-color="#000"
                        active-text-color="#1D695B">
                        <el-menu-item v-for="(item,index) in strategyResultTabList"  :key="index" :index="item.name">{{item.name}}<i :class="item.is_same? 'el-icon-success':'el-icon-error'"></i></el-menu-item>
                      </el-menu>
                    </el-col>
                    <el-col :span="19" class="message-content">
                      <el-tag hit color="#feefef" type="danger" v-show="compareError"  class="font-color-b el-icon-error">审核比对不匹配</el-tag>
                      <div class="message">
                        <el-table
                          :data="tableData"
                          border   
                          :header-cell-style="getRowClass"
                          style="width: 100%">
                          <el-table-column
                            prop="term"
                            label="策略项"
                            header-align="center"
                            width="180">
                              <template slot-scope="scope">
                                <i :class="scope.row.status? 'el-icon-success compare-success':'el-icon-error compare-error'"></i>
                                <span style="margin-left: 10px">{{ scope.row.term }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column
                            prop="strategy"
                            header-align="center"
                            label="策略内容"
                            >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px" class="strategy_data" v-html="scope.row.strategy"></span>
                              </template>
                          </el-table-column>
                          <el-table-column
                            prop="extract"
                            header-align="center"
                            label="招标方案内容">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px" v-html="scope.row.extract"></span>
                            </template>
                          </el-table-column>
                        </el-table>        
                      </div>
                       <el-button class="upload" v-if="value.length > 0" type="primary"  v-loading.fullscreen.lock="fullscreenLoading" @click="exportPDF" icon="el-icon-upload2">导出对比文件</el-button>            
                    </el-col>
                  </el-row>
                </div>  
            </div>
      </div>  
    </el-scrollbar>  
    <el-backtop target=".el-scrollbar .el-scrollbar__wrap"></el-backtop> 
  </div>
</template>
<script>
import TopBar from "@c/Topbar/index.vue";
import { mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import {addRedem , addgreen} from "@/libs/tools";
// let echarts = require('echarts/lib/echarts');
// // 引入柱状图组件
// require('echarts/lib/chart/bar')
export default {
    name:"TenderingCentre",
    components: {
        TopBar
    },
    data(){
      return {
        url: axios.defaults.baseURL+"/project/upload",
        pageNo: 1,
        pageSize: 10,
        isShowProgress: false,
        chartLoading: true,
        fullscreenLoading: false, //下载loading
        nowPercent: 0,
        nowBidding:{},
        uploadStatus: this.$route.params.uploadStatus || 2,
        bId:1, //标的id
        bName:'',//标的名字,
        pClass: 1, //物资类 1与非物资类0
        strategyResultInfo:{},//标的源策略
        strategyResultTabList:[], //审核比对结果左侧数据
        compareStrategyResultInfo:'',//标的对比策略
        compareBoxflag:false, //标的清单比较结果显示状态
        compareError: false, // 审核比对不匹配
        value: [], //级联选择器选择的值
        activeIndex: '0',
        tableData: [],
        strategyTop1:{
          similaruty: 0,
          strategyDept:'',
          same: true
        }
      }
    },
    created(){
      this.getStrategyTree()
    },
    methods:{
      ...mapActions(['uploadBidding','getCompareStrategy','getStrategyTree','getBiddingTop','exportComparePDF']),
      ...mapMutations(['uploadBiddingInfo']),
      beforeUpload(file){
        this.isShowProgress = true
        this.nowPercent = 0
      },
      //点击招标中心 还原上传组件
      updateComponent(data){
        this.uploadStatus= data
      },
      // 上传进度条
      progressUpload(event, file, fileList){
        setTimeout(()=>{
            this.nowPercent = event.percent
        },200)   
      },
      // 得到上传文件后的返回值
      successUpload(response, file, fileList){
        if(response.code === '0'){
          this.uploadBiddingInfo(response.data)         
        }else{
           this.$message({
              type:'error',
              message: '您上传的文档不是招标方案，请上传招标方案文档!',
              duration: 1500
            });
        }
         this.isShowProgress = false
      },
      //查看标的的清单详情
      handleBlist( id , name){
        this.bId = id
        this.bName = name
        this.pClass = this.biddingInfo.pClass;
        this.compareBoxflag = true;
        this.biddingInfo.bList.forEach((item,index)=>{
            if(item.bId === id){
              this.nowBidding=item
            }
        });
        this.getBiddingTop5(id)
      },
      //获取top5数据
      getBiddingTop5(bId){
        let queryParam ={
          bId
        }
        this.chartLoading =true;
        this.getBiddingTop(this.$qs.stringify(queryParam))
          .then(res => {
            let biddingTop5X=[];
            let biddingTop5Y=[];
            this.biddingTopData.forEach((item,index)=>{
                let xData = item.middle.deptName + ' \n'+item.middle.firstDir+' \n'+item.middle.secDir;
                biddingTop5X.push(xData)
                biddingTop5Y.push(item.left*100)
            })
            //得到最符合策略的数据
            this.strategyTop1.strategyDept =this.biddingTopData[0].middle.deptName + '/' + this.biddingTopData[0].middle.firstDir + '/' +this.biddingTopData[0].middle.secDir
            this.strategyTop1.similaruty = this.biddingTopData[0].left
            this.strategyTop1.same = this.biddingTopData[0].right.result[this.bName].diff['标包划分原则']['标包划分原则'].is_same
            this.drawLine(biddingTop5X,biddingTop5Y);
          })
       
      },
      //获取对比策略
      getCompareStragy(pClass,deptName,firstDir,secDir){
         let queryParam ={
          bId: this.bId,
          pClass,
          deptName,
          firstDir,
          secDir
        }
        this.exportParam = queryParam;
        this.getCompareStrategy(this.$qs.stringify(queryParam))
          .then(res => {
            if (res.code == '0') {
              this.strategyResultInfo = res.data.right.result[this.bName].diff
              this.showTableRsult()
            }
          })
          .catch(error => {
            this.$message({
              type:'error',
              message: error,
              duration: 1500
            });
          });       
      },
      //绘制图表
      drawLine(xData,yData) {
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.clear()
        // 绘制图表
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                 formatter: function(params){
                   return '相似度:'+params[0].data.toFixed(2)+'%';
                 }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                axisLabel: {  
                  show: true,  
                  interval: 'auto',  
                  formatter: '{value}%'  
                },  
                min: function(value) {
                    return Math.ceil(value.min - 10);
                },
                show: true,
                scale: true
            },
            xAxis: {
                type: 'category',
                data:xData,
                axisLabel: {  
                  interval:0
                } 
            },
            series: [
                {
                    type: 'bar',
                    stack: '总量',
                    color: '#00B0F0',
                    barWidth : 30,
                    barCategoryGap:"80%",
                    data:yData
                }
            ]
        };
        myChart.setOption(option, true);
        this.chartLoading = false;
        myChart.on('click', (param)=> {
          var strategyArr = param.name.split(' \n');
          strategyArr.unshift(this.pClass)
          this.value = strategyArr
          this.strategyResultInfo = this.biddingTopData[param.dataIndex].right.result[this.bName].diff;
          this.showTableRsult();
        });
      },
      //审核对比结果展示
      showTableRsult(){
          var tabList=[]
          for(var i in this.strategyResultInfo){
            if(i == '供应商资格预审（资质能力评价）' || i=='业主代表'|| i == '招标方式' || i == '标包划分原则'){
              continue;
            }
            var itemObj = {
                name: i,
                is_same: true
            }
            for(var j in this.strategyResultInfo[i]){
              if(!this.strategyResultInfo[i][j].is_same){
                  itemObj.is_same = false
              }
            }
            tabList.push(itemObj)
          }
          this.strategyResultTabList = tabList
          this.formSelect('商务详细评审')
      },
      //手动选择对比结果参数
      handleChange(value) { 
        var pClass= value[0];
        var deptName =value[1];
        var firstDir = value[2];
        var secDir = value[3];
        this.getCompareStragy(pClass,deptName,firstDir,secDir)
      },
      //点击审核比对结果左侧tab栏显示右边的表格
      formSelect(key, keyPath){
         this.compareError = false
        this.activeIndex = key
        var tableData=[]
        for(var i in this.strategyResultInfo[key]){
          var item={
            term:i,
            status:this.strategyResultInfo[key][i].is_same,
            strategy:addgreen(this.strategyResultInfo[key][i].string2 , this.strategyResultInfo[key][i].diff2_idx),
            extract: addRedem(this.strategyResultInfo[key][i].string1 , this.strategyResultInfo[key][i].diff1_idx)
          }

          if(!this.strategyResultInfo[key][i].is_same){
            this.compareError = true
          }
          tableData.push(item)
        }
        this.tableData=tableData
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
            return 'background-color: #449B77;color: #fff;font-weight: 500;'
        } else {
            return ''
        }
      },
      //导出PDF
      exportPDF(){
        this.fullscreenLoading = true;
        if(this.value.length == 0){
            this.$message.error('请选择对比策略');
            return false
        }
        let queryParam ={
          bId: this.bId,
          pClass: this.value[0],
          deptName: this.value[1],
          firstDir:this.value[2],
          secDir:this.value[3]
        }    
        this.exportComparePDF(this.$qs.stringify(queryParam))
        .then(res =>{
          this.fullscreenLoading = false;
          //下载PDF
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          let head = res.headers['content-disposition'];
          let fname = this.nowBidding.bName + '检查报告.pdf';
          link.href = url;
          link.setAttribute('download', fname);
          document.body.appendChild(link);
          link.click();
        } , err =>{
          this.$message.error('导出失败');
          this.fullscreenLoading = false;
        })
      },
      //监听滚动事件
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log(scrollTop)
      }
    },
    computed: {
      biddingInfo () {
        return this.$store.state.uploadBiddingInfoData;　　//需要监听的数据
      },
      strategyTreeOption(){
        return this.$store.state.strategyTreeData; //树的数据
      },
      biddingTopData(){
        return this.$store.state.biddingTopData;
      }
    }
}
</script>
<style scoped>
  @import url('~@/style/index.css');
</style>
<style lang="less">
  .upload-file{
      width:130px;
      height:40px;
      background:linear-gradient(313deg,rgba(29,105,91,1) 0%,rgba(68,155,119,1) 100%);
      opacity:1;
      border-radius:2px;
      font-size: 16px;
      border: none;
      &:hover{
        background:rgba(29,105,91,1);
        border: none;  
      }
      &:focus{
        background:rgba(29,105,91,1);
        border: none; 
      }
  }
  .progressDialog .el-dialog__footer{
    text-align: center;
  }
  .container-centre .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: auto;
  }
  .message-content {
    .compare-success{
      color: #00b050 !important;
    }
    .compare-error{
      color: #F80000 !important
    }
    .font-color-b{
      color: #666!important;
      height: 36px;
      line-height: 36px;
      width:168px;
      font-size: 14px;
      text-align: center;
      &::before{
        color: #f80000;
        margin-right: 10px;
      }
    }
  }
  .centre .el-cascader.el-cascader--medium{
      width: 380px;
  }
  .message em{
    color: #F80000;
    font-style: normal;
  }
  .strategy_data i{
    color: #00B050;
    font-style: normal;
  }
</style>
<style lang="less" scoped>
  .centre{
    overflow-y: hidden;
    height: 100%;
    width: 100%;
    .container{
      text-align: left;
      box-sizing: border-box;
      padding-top: 20px;
      .upload-title{
        width:120px;
        font-size:18px;
        font-weight:600;
        line-height:34px;
        color:#000;
      }
      .underlying{
        overflow: hidden;
        padding: 20px;
        background-color: #fff;
        li{
          float:left;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .compareBox{
    height: 200px;
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    margin-top: 20px;
    .compare_item{
      display: flex;
      margin-bottom: 10px;
      .compare_item_title{
        width: 120px;
        line-height:24px;
        color: #666666;
        font-size: 14px;
        text-align: right;
      }
      .compare_item_content{
        padding-left: 10px;
        box-sizing: border-box;
        line-height:24px;
        font-size: 14px;
        color: #333;
      }
      .remind_color{
        color: #909399;
      }
      .success_color{
        color:#1D695B;
      }
      .error_color{
        color: #C0504D;
      }
    }
  }
  .compare_top{
    font-size: 18px;
    font-weight: 600;
    line-height: 34px;
    color: #000;
    margin: 20px 0;
    }
  .compare_top_box{  
    background-color: #fff;
  }
  .compare_result{
    margin-top: 20px;
    .el-menu-demo{
       .el-icon-success{
          color:#00b050!important;
          float: right
      }
      .el-icon-error{
          color:#F80000!important;
          float: right
      }
    } 
    .el-menu-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .upload{
    border:none;
    font-size: 14px;
    width:180px;
    height:40px;
    background:linear-gradient(313deg,rgba(29,105,91,1) 0%,rgba(68,155,119,1) 100%);
    border-radius:2px;
    display: block;
    margin: 5px auto;
  }
  .message-content{
    padding: 30px!important;
    box-sizing: border-box;
    background-color: #fff;
    .font-color-b{
      margin-bottom: 30px;
    }
  }   
</style>
