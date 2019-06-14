<template>
    <header class="header">
        <div class="container">
        <h1>
            <router-link to="/home">
                <img src="@/assets/images/login-title.png" alt="南方电网" class="nav-logo">
            </router-link>
        </h1>
        <ul class="nav">
            <li class="nav-item"> <router-link :class="[msg==='home'? 'active' : '']" to="/home">首页</router-link></li>
            <li class="nav-item"><router-link :class="[msg==='strategy'? 'active' : '']" to="/strategy">策略库</router-link></li>
            <li class="nav-item"><router-link :class="[msg==='centre'? 'active' : '']" to="/centre">招标中心</router-link></li>
            <li class="nav-item">
                <el-input
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="inputValue"
                    class="search-box">
                </el-input>
            </li>
        </ul>
        </div>
    </header>
</template>
<script>
export default {
    name: 'TopBar',
    props:{
        msg:{ 
            type: String
        }
    },
    data(){
        return {
            inputValue: ''
        }
    }
}
</script>
<style>
    .nav-item .search-box input.el-input__inner:focus{
        border-color: #1D695B;
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
                    // &:after{
                    //     content: "";
                    //     display: inline-block;
                    //     position: absolute;
                    //     bottom: 0;
                    //     left: calc(50% - 15px);
                    //     width: 30px;
                    //     height: 2px;
                    //     background: #409eff;
                    // }
                }
            }
        }
     } 
 }

</style>
