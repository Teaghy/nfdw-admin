<template>
  <div class="home">
    <div class="headerWrapper">
      <top-bar :msg="'home'" ref="searchBar" :pageNo="pageNo" :pageSize="pageSize" :pClass="pClass" @search="searchValue"></top-bar>
    </div>
    <div class="container">
      <div class="main">
        <el-tabs v-model="activeName" class="tab_project" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in tabList" :key="index" class="all" :label="item.label" :name="item.name">
             <div class="scroll-project">
                <el-scrollbar style="height:100%">
                    <ul class="all_project">
                      <li v-for="(item,index) in mGetBiddingListData" @click="biddingDetail(item.pId)" :key="index">
                      <p>{{item.pName}}</p>
                      <div class="time">
                        <i class="el-icon-time icon_time"></i>
                        <span>{{item.pCreatime}}</span>
                      </div>
                      <div class="notice">招标公告</div>
                      </li>
                    </ul>
                </el-scrollbar>
              </div>
          </el-tab-pane>
        </el-tabs>
        <el-pagination
          :current-page.sync="pageNo"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="updateData"
          hide-on-single-page>
        </el-pagination>
      </div>
      <!-- <div class="aside">
          <h4 class="newpublish">最新发布</h4>
          <ul class="new_list">
            <li>
              <p>关于XXXXX项目的招标</p>
              <div class="time">
                <i class="el-icon-time icon_time"></i>
                <span>07-07 12:00</span>
              </div> 
            </li>
            <li>
              <p>关于XXXXX项目的招标</p>
              <div class="time">
                <i class="el-icon-time icon_time"></i>
                <span>07-07 12:00</span>
              </div> 
            </li>
             <li>
              <p>关于XXXXX项目的招标</p>
              <div class="time">
                <i class="el-icon-time icon_time"></i>
                <span>07-07 12:00</span>
              </div> 
            </li>
             <li>
              <p>关于XXXXX项目的招标</p>
              <div class="time">
                <i class="el-icon-time icon_time"></i>
                <span>07-07 12:00</span>
              </div> 
            </li>
             <li>
              <p>关于XXXXX项目的招标</p>
              <div class="time">
                <i class="el-icon-time icon_time"></i>
                <span>07-07 12:00</span>
              </div> 
            </li>
          </ul>
      </div> -->
      
    </div>   
  </div>
 
</template>
<script>
  import TopBar from "@c/Topbar/index.vue";
  import { mapActions, mapMutations, mapState} from 'vuex';
  export default {
    name: 'Home',
    components: {
        TopBar
    },
    data() {
      return {
        activeName: 'first',
        pageNo: 1,
        pageSize: 10,
        total: 1,
        pClass: '',
        pName:'',
        tabList:[
          {label: '全部项目', name: 'first'},
          {label: '物资类', name: 'second'},
          {label: '非物资类', name: 'third'}
        ]
      };
    },
    created(){
      this.updateData();
    },
    methods: {
      ...mapActions([
        'getBiddingList',
        'getBiddingDetail'
      ]),
      searchValue(total){
        this.total = total;
      },
      handleClick(tab, event) {
        if(tab.name === 'first'){
          this.pClass = ''
        }else if(tab.name === 'second'){
          this.pClass = 1
        }else if(tab.name === 'third'){
          this.pClass = 0
        }
        this.pageNo = 1
        this.updateData()
      },
      updateData(){ 
        this.$nextTick(function () { 
            this.$refs.searchBar.updateData() 
         });        
      },
      biddingDetail(pId){
        let queryParam ={
          pId
        }
        this.getBiddingDetail(this.$qs.stringify(queryParam))
          .then(res =>{
            this.$router.push({name:'centre',params:{uploadStatus: 1}})
          })
          .catch(error => {
            this.$message({
              type:'error',
              message: error,
              duration: 1500
            });
        });   
        
      }
    },
    computed:{
       ...mapState(["mGetBiddingListData"])
    }
  };
</script>
<style scoped>
  @import url('~@/style/index.css');
</style>
<style lang="less" scoped>
    .home{
      height: 100%;
      overflow-y: hidden;
    }
    .header{
        height:60px;
        line-height: 60px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px rgba(0,0,0,0.1);
        opacity:1;   
    }
    .container{
      display: flex;
      padding-top: 20px;
      height: 100%;
      box-sizing: border-box;   
    }
    .main{
      flex: 2;
      margin-right: 20px;
      height: 100%;
      .scroll-project{
        height: 100%;
      }
      .all_project{
        width: 100%;
        li{
          height: 156px;
          padding: 15px;
          box-sizing: border-box;
          padding-left: 230px;
          text-align: left;
          background: url("~@/assets/images/home_pic_b.png") no-repeat 20px center; 
          display: flex;
          flex-direction: column;
          justify-content: space-between;        
          background-color:rgba(255,255,255,1);
          margin-bottom: 16px;
          cursor: pointer;
          position: relative;
          &:hover{
            box-shadow:0px 2px 4px rgba(0,0,0,0.1);
            p{
              color: #1D695B;
            }
          }
          .time{
          color: #999999;
          }
          .icon_time{
            margin-right: 5px;
          }
          p{
            font-size: 18px;
            color: #333;
            font-weight: normal;
          }
          .notice{
            height: 30px;
            line-height: 32px;
            width:56px;
            font-size:14px;
            font-family:Source Han Sans CN;
            color:#fff;
            opacity:1;
            width: 110px;
            text-align: center;
            position: absolute;
            right: 8px;
            bottom: 0;
            background: url("~@/assets/images/zb_notice.png") no-repeat left center;
          }
        }
      }
    }
    .aside{
      flex: 1;
      width: 410px;
    }
    .newpublish{
      margin-bottom: 20px;
      height: 45px;
      line-height: 45px;
      border-bottom:2px solid #E4E7ED;
      box-sizing: border-box;
      color: #333;
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        display: inline-block;
        width: 64px;
        height: 2px;
        background-color: #1D695B;
      }
    }
    .new_list{
      padding: 0 20px;
      background: #fff;
      li{
        width: 100%;
        height: 120px;
        padding: 15px 0 15px 155px;
        background: url("~@/assets/images/home_pic_l.png") no-repeat left center; 
        border-bottom: 1px solid #EFEFEF;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .time{
          color: #999999;
        }
        .icon_time{
          margin-right: 5px;
        }
        p{
          font-size: 16px;
          color: #333;
          font-weight: normal;
        }
      }
    }
</style>
