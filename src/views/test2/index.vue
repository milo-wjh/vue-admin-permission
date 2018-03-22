<template>
  <div class="app-container">
    <h1>this is test2</h1>
  </div>
</template>

<script>
  export default {
    data() {
        return {

        }
    },
    created() {
        console.log(this.$route);
        console.log(this.$route.params.id);
        console.log(11111)
    }
  }
</script>
