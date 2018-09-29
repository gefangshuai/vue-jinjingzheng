<template>
    <div class="hello">
        <h1 style="margin-bottom: 20px;">{{ msg }}</h1>
        <div class="wrapper">
            <div class="settings">
                <p>
                    请求超时时间：
                </p>
                <p>
                    <Input v-model="time">
                        <span slot="append">毫秒</span>
                    </Input>
                </p>
                <p>
                    <Button type="primary" @click="timeout=time">确定</Button>
                </p>
                <p>
                    <b>
                        成功列表：
                    </b>
                </p>
                <p v-for="m in successed">
                    <span style="margin-right: 10px">
                            {{moment(m.time).format('HH:mm:ss')}}
                        </span>
                    <span v-html="m.msg"></span>
                </p>
            </div>
            <div class="content" ref="content">
                <div ref="list">
                    <div v-for="(m, index) in messages">
                        <b>第{{index + 1}}次尝试：</b>
                        <span style="margin-right: 10px">
                            {{moment(m.time).format('HH:mm:ss')}}
                        </span>
                        <span v-html="m.msg"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                messages: [],
                time: 3000,
                timeout: 3000
            }
        },
        props: {
            msg: String
        },
        computed: {
            successed(){
                return this.$_.filter(this.messages, {code: 1})
            }
        },
        mounted() {
            this.check();
            Notification.requestPermission(function (status) {
                // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
            });
        },
        methods: {
            moment(time){
                return moment(time)
            },
            check() {
                this.$http.get('/app_web/jsp/homepage.jsp', {
                    timeout: this.timeout
                }).then(res => {
                    this.messages.push({
                        code: 1,
                        msg: '<span class="text-success">服务已上线！！！</span>',
                        time: new Date()
                    });
                    new Notification("服务已上线！")
                }).catch(error => {
                    if (error.code === 'ECONNABORTED') {
                        this.messages.push({
                            code: 0,
                            msg: '<span class="text-danger">服务超时...</span>',
                            time: new Date()
                        });
                        this.check();
                    } else {
                        this.messages.push({
                            code: 0,
                            msg: '<span class="text-danger">' + error + '</span>',
                            time: new Date()
                        })
                    }
                    this.$nextTick(() => {
                        let height = this.$refs['list'].scrollHeight;
                        this.$refs['content'].scrollTop = height + 100
                    })
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
    p {
        margin: 10px 0;
    }
    a {
        color: #42b983;
    }
    .wrapper {
        display: flex;
        width: 950px;
        margin: 0 auto;
    }
    .settings {
        text-align: left;
        width: 300px;
    }
    .content {
        text-align: left;
        margin-left: 30px;
        width: 500px;
        height: 500px;
        overflow: auto;
        border-left: 1px solid #ddd;
        padding-left: 30px;
    }
</style>
