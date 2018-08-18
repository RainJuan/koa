<template>
    <div>
        <!-- start:search-bar -->
       <div class="search-bar">
           <van-row>
               <van-col span="3">
                   <img :src="imgUrl" width="100%" class="location-icon">
               </van-col>
               <van-col span="15">
                   <input type="text" class="search-input">
               </van-col>
               <van-col span="6">
                   <van-button size="mini" class="search-btn">
                    查找
                   </van-button>
               </van-col>
           </van-row>
       </div>
        <!-- end:search-bar -->

        <!-- start:banner-->
        <div class="banner">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(bannerImg,index) in bannerPicArray" :key="index"> 
                    <img v-lazy="bannerImg.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- end:banner-->
        <!-- start:category -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key=index>
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- end:category -->
        <!-- start:add banner Bar -->
        <div class="ad-banner">
            <img v-lazy="addBanner" width="100%">
        </div>
        <!-- end:add banner Bar -->
        <!-- start:Remmend goods area-->
            <div class="recommend-area"> 
                <div class="recommend-title">
                    商品推荐
                </div>
                <div class="recommend-body">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                            <div class="recommend-item">
                                <img :src="item.image" width="80%">
                                <div>{{item.goodsName}}</div>
                                <div>¥{{item.price | transformMoney}}（￥{{item.mallPrice | transformMoney}}）</div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        <!-- end:Remmend goods area-->
       <!-- start:引用楼层组件 -->
       <floor-component :floorData="floor1" :flootTitle="floorTitleName1"></floor-component>
       <floor-component :floorData="floor2" :flootTitle="floorTitleName2"></floor-component>
       <floor-component :floorData="floor3" :flootTitle="floorTitleName3"></floor-component>
       <!-- end:引用楼层组件 -->
       <!-- start:热卖商品 -->
       <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12"  v-for="(item,index) in hotGoods" :key="index">
                            <hot-goods :image="item.image" :name="item.name" :price="item.price"></hot-goods>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
       </div>
       <!-- end:热卖商品 -->
    </div>
</template>
<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide,List} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import hotGoods from '../component/hotGoodsComponent'
    import {formatMoney} from '@/components/filter/filter'
    export default {
        data() {
            return {
                swiperOption:{
                    loop:true,
                    slidesPerView:3,
                },
                imgUrl:require('@/images/location.png'),
                bannerPicArray:[],
                category:[],
                addBanner:'',
                recommendGoods:[],  
                floor1:[],
                floor2:[],
                floor3:[],
                floorTitleName:{},
                floorTitleName1:'',
                floorTitleName2:'',
                floorTitleName3:'',
                hotGoods:[],
            }
        },
        components:{
            swiper,
            swiperSlide,
            floorComponent,
            hotGoods,
            List,
        },
       filters:{
           transformMoney(money){
               return formatMoney(money)
           }
       },
        created(){
            axios(
                {
                    url:'https://www.easy-mock.com/mock/5b38f5d78b3b752220ff64a6/vueandkao2/index',
                    method:'get'
                }
            ).then(response=>{
                if(response.status==200){
                    console.log(response)
                    this.bannerPicArray=response.data.data.slides
                    this.category=response.data.data.category
                    this.addBanner=response.data.data.advertesPicture.PICTURE_ADDRESS
                    this.recommendGoods=response.data.data.recommend
                    this.floor1=response.data.data.floor1
                    this.floor2=response.data.data.floor2
                    this.floor3=response.data.data.floor3
                    this.floorTitleName1=response.data.data.floorName.floor1
                    this.floorTitleName2=response.data.data.floorName.floor2
                    this.floorTitleName3=response.data.data.floorName.floor3
                    this.hotGoods = response.data.data.hotGoods
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
</script>
<style scoped>
    .search-bar{
        height:2.2em;
        line-height:2.2em;
        background-color: #e5017d;
        overflow:hidden;
    }
    .search-input{
        width:100%;
        background-color: #e5017d; 
        border-top:0px;
        border-right:0px;
        border-left:0px;
        height:1.3rem;
        border-bottom:1px solid #fff !important;
    }
    .location-icon{
        padding-top:.2rem;
        padding-left:.3rem;
    }
    .banner{
        clear:both;
        width:20rem;
        max-height:20rem;
        max-height:15em;
        overflow:hidden;
    }
    .type-bar{
        display:flex;
        flex-direction:row;
        flex-wrap: nowrap;
        font-size:14px;
        background:#fff;
        margin:0 .3rem .3rem .3rem;
        border-radius:.3rem;
    }
    .type-bar div{
        padding:.3rem;
        font-size:12px;
        text-align:center;
    }
    .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
    }
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
        border-bottom:1px solid #eee;
    }
    .recommend-item{
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align:center;
    }
    .recommend-body{
        border-bottom:1px solid #eee;
    }
    /*热卖商品*/
    .hot-area{
        text-align: center;
        font-size:14px;
        height:1.8rem;
        line-height: 1.8rem;
    }
    .hot-title{
       
    }
    
    .hot-goods{
       
    }
</style>