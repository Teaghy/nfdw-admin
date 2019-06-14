<template>
  <div class="centre">
    <div class="headerWrapper">
      <top-bar :msg="'centre'"></top-bar>
    </div> 
    <el-scrollbar style="height:100%;" > 
      <div class="container container-centre">          
            <h4 class="upload-title">上传招标文件</h4>
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
                <el-button v-if="nowPercent == 100" type="success" @click="isShowProgress = false">查看结果</el-button>
              </span>
            </el-dialog>
            <div class="compareBox">
                <div class="compare_item">
                  <div class="compare_item_title">是否公开招标:</div>
                  <div class="compare_item_content">{{ 0 | openStatusFmt}}</div>
                </div>
                <div class="compare_item">
                  <div class="compare_item_title">标的名称:</div>
                  <div class="compare_item_content">安全帽招标方案</div>
                </div>
                <div class="compare_item">
                  <div class="compare_item_title">策略库匹配:</div>
                  <div class="compare_item_content">
                    <p class="success_color">已为您匹配到最接近策略-安监部/信息服务咨询 策略相识度90%</p>
                    <p class="remind_color">(您也可以在下方选择查看其他策略库对比结果)</p>
                  </div>
                </div>
                <div class="compare_item">
                  <div class="compare_item_title">是否符合标包策略:</div>
                  <div class="compare_item_content error_color">{{ 0 | strategyStatusFmt}}</div>
                </div>
            </div>
            <h4 class="compare_top">对比结果TOP5</h4>
            <div class="compare_top_box">
              <div id="myChart" :style="{width: '700px', height: '300px'}"></div>
            </div>
            <h4 class="compare_top">手动选择对比策略</h4>
            <div class="block">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                placeholder="请选择对比策略类别"
              >
              </el-cascader>
            </div>  
            <h4 class="compare_top">审核比对结果:</h4>
            <div class="compare_result">
              <el-row :gutter="20">
                <el-col :span="5">
                    <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    @select="formSelect"
                    text-color="#000"
                    active-text-color="#1D695B">
                    <el-menu-item index="1">专业资格要求<i class="el-icon-error"></i></el-menu-item>
                    <el-menu-item index="2">信息设备修理维护<i class="el-icon-success"></i></el-menu-item>
                    <el-menu-item index="3">信息系统测试<i class="el-icon-success"></i></el-menu-item>
                    <el-menu-item index="4">信息系统监理<i class="el-icon-success"></i></a></el-menu-item>
                    <el-menu-item index="5">信息系统推广建设<i class="el-icon-success"></i></a></el-menu-item>
                  </el-menu>
                </el-col>
                <el-col :span="19" class="message-content">
                  <el-tag hit color="#feefef" type="danger" class="font-color-b el-icon-error">审核比对不匹配</el-tag>
                  <div class="message" v-show="activeIndex == '1'">
                    <el-table
                      :data="tableData"
                      border   
                      :header-cell-style="getRowClass"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="策略项"
                        header-align="center"
                        width="180">
                          <template slot-scope="scope">
                            <i :class="scope.$index % 2 ? 'el-icon-success compare-success':'el-icon-error compare-error'"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        header-align="center"
                        label="预置策略"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        header-align="center"
                        label="上传文件内容抽取">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.address }}</span>
                        </template>
                      </el-table-column>
                    </el-table>        
                  </div>            
                </el-col>
              </el-row>
            </div>  
            <div class="compare_footer">
              <el-button type="primary" icon="el-icon-upload2">导出对比文件</el-button>
            </div>
      </div>  
    </el-scrollbar>   
  </div>
</template>
<script>
import TopBar from "@c/Topbar/index.vue";
import { mapActions, mapMutations } from 'vuex';
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
export default {
    components: {
        TopBar
    },
    data(){
      return {
        url: this.$store.state.url+"/bidding/upload",
        isShowProgress: false,
        nowPercent: 0,
        value: [],
        options: [{
          value: 'wuzhilei',
          label: '物质类',
          children: [{
            value: 'anjianbu',
            label: '安监部',
            children: [{
              value: 'yizhi',
              label: '信息服务咨询'
            }, {
              value: 'fankui',
              label: '信息设备修理维护'
            }, {
              value: 'xiaolv',
              label: '信息系统测试'
            }, {
              value: 'kekong',
              label: '信息系统监理'
            }, {
              value: 'kekong',
              label: '信息系统建设推广'
            }]
          }, {
            value: 'daohang',
            label: '办公室',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          },
          {
            value: 'daohang',
            label: '生计部',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          },
          {
            value: 'daohang',
            label: '市场部',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          },
          {
            value: 'daohang',
            label: '信息部',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
          }, {
            value: 'zujian',
            label: '非物质类',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }],
        activeIndex: '1',
        tableData: [{
            date: '注册资本要求',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '业绩要求',
            name: '业绩要求',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '投标人资格要求',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '证书要求',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    mounted(){
       console.log(this.$store.state.url)
       this.drawLine();
    },
    methods:{
      ...mapActions(['uploadBidding']),
      ...mapMutations(['uploadBiddingInfo']),
      beforeUpload(file){
        this.isShowProgress =true
      },
      // 上传进度条
      progressUpload(event, file, fileList){
        setTimeout(()=>{
            this.nowPercent = event.percent
        },200)   
      },
      // 得到上传文件后的返回值
      successUpload(response, file, fileList){
        console.log(response)
        this.uploadBiddingInfo(response.data)
      },
      drawLine() {
        let myChart = echarts.init(document.getElementById('myChart'))
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                 formatter: function(params){
                   console.log(params)
                   return '相似度:'+params[0].data+'%'
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
                  formatter: '{value} %'  
                },  
                show: true  
            },
            xAxis: {
                type: 'category',
                data: ['物资类', '物资类', '物资类', '物资类', '物资类' ]
            },
            series: [
                {
                    type: 'bar',
                    stack: '总量',
                    color: '#00B0F0',
                    barWidth : 30,
                    label: {
                      normal: {
                          show: true,
                          position: 'top',
                          formatter: '{c}%'
                      }
                    },
                    data: [10, 50 , 60, 40 , 90]
                }
            ]
        };
        myChart.setOption(option);
      },
      handleChange(value) {
        console.log(value);
      },
      formSelect(key, keyPath){
        this.activeIndex = key
        console.log(this.activeIndex)
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
            return 'background-color: #449B77;color: #fff;font-weight: 500;'
        } else {
            return ''
        }
      }
    },
    computed: {
      biddingInfo () {
        return this.$store.state.uploadBiddingInfoData;　　//需要监听的数据
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
  .compare_footer{
    text-align: center;
    margin: 40px 0;
    button{
      border:none;
      font-size: 14px;
      width:180px;
      height:40px;
      background:linear-gradient(313deg,rgba(29,105,91,1) 0%,rgba(68,155,119,1) 100%);
      border-radius:2px;
    }
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
