<template>
  <div id="app">
    <hearder-tag></hearder-tag>
    <body-tag></body-tag>
  </div>
</template>

<script>
import hearderTag from "./header/header"
import bodyTag from "./body/body"
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    hearderTag,
    bodyTag
  }
}
</script>

<style >

</style>
