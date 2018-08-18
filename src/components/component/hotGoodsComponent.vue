<template>
    <div class="hot-goods">
        <div class="hot-goods-image">
            <img v-lazy="image" width="90%">
        </div>
        <div class="hot-goods-name">{{name}}</div>
        <div class="hot-goods-price">¥{{price | formatToMoney}}</div>
    </div>
</template>

<script>
import {formatMoney} from '@/components/filter/filter'
    export default {
        props:['image','name','price'],
        filters:{
            formatToMoney(money){
                return formatMoney(money)
            }
        }
    }
</script>

<style scoped>
    .hot-goods-name{
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
        padding:0 8px;
    }
</style>