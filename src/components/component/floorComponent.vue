<template>
    <div>
         <!-- start:floor -->
        <div class="floorTitle">{{flootTitle}}</div>
        <div class="floor">
            <!-- 不规则层 -->
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floorData0.image" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                         <img :src="floorData1.image" width="100%">
                    </div>
                    <div >
                         <img :src="floorData2 .image" width="100%">
                    </div>
                </div>
            </div>
            <!-- 规则层 -->
            <div class="floor-rule">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                     <img :src="item.image" width="100%">
                </div>
            </div>
        </div>
        <!-- end:floor -->
    </div>
</template>

<script>
    export default {
        name:'floorComponent',
        props:['floorData','flootTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        watch:{
            floorData(val){
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]   
            },
        },
    }
</script>

<style scoped>
    /* 楼层内容 :不规则布局*/
    .floor-anomaly{
        display: flex;
        flex-direction: row;
        background-color:#fff;
        border-bottom:1px solid #ddd;
    }
    .floor-anomaly div{
        width:10rem;
        box-sizing:border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-one{
        border-right:1px solid #eee;
    }
    .floor-two{
        border-bottom:1px solid #eee;
    }
    /* 楼层内容 :规则布局*/
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background:#fff;

    }
    .floor-rule div{
        width:10rem;
        -webkit-box-sizing: border-box;
        box-sizing:border-box;
        border-bottom:1px solid #ddd
    }
    .floor-rule div:nth-child(odd){
        border-right:1px solid #ddd;
    }
    .floorTitle{
        text-align: center;
        font-size:14px;
        height:1.8rem;
        line-height:1.8rem;
    }
</style>