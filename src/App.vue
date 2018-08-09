<template>
  <div id="app">
   <lottert></lottert>
   <winning-list></winning-list>
  </div>
</template>

<script>
import lottert from "./lottery/lottery"
import winningList from "./winningList/winning_list"
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    lottert,
    winningList
  }
}
</script>

<style >

</style>
