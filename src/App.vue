<template>
    <div id="app">
        <HelloWorld msg="进京证服务定时检测"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        }
    }
</script>

<style>
    #app {
        font-size: 14px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
    }
    .text-danger {
        color: #dd4a3e;
    }
    .text-success {
        color: #21dd92;
    }

</style>
