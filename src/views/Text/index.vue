<template>
    <header class="header">
        <div class="container">
            <h1>
                <router-link to="/home">
                    <img src="@/assets/images/login-title.png" title="招投标风险预警系统" class="nav-logo">
                </router-link>
            </h1>
            <ul class="nav">
                <li class="nav-item"> <router-link :class="[msg==='home'? 'active' : '']" to="/home">首页</router-link></li>
                <li class="nav-item"><router-link :class="[msg==='centre'? 'active' : '']" to="/centre">招标中心</router-link></li>
                <li class="nav-item">
                    <el-input
                        placeholder="请输入搜索内容"
                        prefix-icon="el-icon-search"
                        v-model="inputValue"
                        class="search-box"
                        ref="input"
                        clearable
                        @clear="clearValue"
                        @keyup.enter.native="searchData"
                    >
                    </el-input>
                </li>
                <li class="nav-item user_info">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </div>
    </header>
  </template>

  <script>
  import { mapMutations } from 'vuex';
    export default {
    name: 'TopBar',
    props:{
        msg:{ 
            type: String
        }
    },
      data() {
        return {
          inputValue:'',
          input:'',
           username:sessionStorage.getItem('username'),
        }
      },
      mounted(){
       
      },
      methods:{
        //  clearValue(){
        //   console.log(123123)
        // },
        // searchData(){
        //   console.log(123123)
        // }
         ...mapMutations(['mResState']),
        handleCommand(command) {
            if(command === 'logout'){
                sessionStorage.removeItem('username')
                this.mResState()
                this.$router.push({name:'login'})
            }
        },
        searchData(){
            this.$refs.input.blur()
            this.$emit('search',this.inputValue)
        },
        clearValue(){
            console.log('清空了')
        }
      },
      watch:{
        'input'(val,old){
          console.log(val,old)
        },
        'inputValue'(val,old){
          console.log(val,old)
        }
      }
    }
  </script>
  <style>
    .nav-item .search-box input.el-input__inner:focus{
        border-color: #1D695B;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
<style lang="less" scoped>
 .header{
      height:60px;
      line-height: 60px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 4px rgba(0,0,0,0.1);
      opacity:1;
   }
 .container{
     width: 1200px;
     height: 60px;
     line-height: 60px;
     margin: 0 auto;
     text-align: left;
     h1 a{
        color: #333;
        height: 60px;
        text-decoration: none;
        display: block;
        float: left;
        .nav-logo{
          vertical-align: sub;
        }
     }
     .nav{
        float: right;
        height: 100%;
        line-height: 60px;
        background: transparent;
        padding: 0;
        margin: 0;
        .nav-item{
            margin: 0;
            float: left;
            list-style: none;
            position: relative;
            cursor: pointer;
            &.user_info{
                margin-left: 30px;
                font-size: 14px;
            }
            a{
                text-decoration: none;
                color: #1D695B;
                opacity: .5;
                display: block;
                padding: 0 22px;
                &:hover{
                    opacity: 1;
                }
                &.active{
                    opacity: 1;
                }
            }
        }
     } 
 }

</style>