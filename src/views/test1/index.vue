<template>
  <div class="app-container">
    <h1 @click="goParams">this is test1</h1>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            id: 1
        }
    },
    methods: {
        goParams() {
            this.$router.push({
                path: '/test2',
                params: {
                    id: this.id
                }
            })
        }
    }
  }
</script>
