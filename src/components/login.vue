<template>
    <div class="login">
        <div class="loginDiv">
            <h4>途乐户外后台管理登录</h4>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="登录账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" v-model="loginForm.userPwd" placeholder="登录密码"
                              @keyup.enter.native="submit('loginForm')"></el-input>
                </el-form-item>
                <!--<el-form-item prop="captcha">-->
                <!--<el-input class="captcha" v-model="loginForm.captcha" placeholder="验证码"></el-input>-->
                <!--<img src="" alt="验证码">-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    import md5 from 'js-md5';
    $(function(){
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,

            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1400;
        console.log(w)
        console.log(h)
        // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
        // Cache gradient
        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width/2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#fff');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var Star = function() {

            this.orbitRadius = random(w / 2 - 50);
            this.radius = random(100, this.orbitRadius) / 10;
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 100000;
            this.alpha = random(2, 10) / 10;

            count++;
            stars[count] = this;
        }

        Star.prototype.draw = function() {
            var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
                twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
            new Star();
        }

        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
            ctx.fillRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };

            window.requestAnimationFrame(animation);
        }

        animation();
    })





    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    userName: '',
                    userPwd: '',
                    captcha: '',
                },
                loginRules: {
                    userName: [
                        {required: true, message: '登录账号不能为空', trigger: 'blur'}
                    ],
                    userPwd: [
                        {required: true, message: '登录密码不能为空', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ]
                }

            }
        },
        mounted() {
        },
        methods: {
            submit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$post('login/login', {
                            member_name: this.$refs[form].model.userName,
                            member_password: md5(this.$refs[form].model.userPwd)
                        })
                            .then(res => {
                                this.$message.success(res.message)
                                this.$local.set('adminInfo', res.data)
                                setTimeout(() => {
                                    this.$router.push('/')
                                }, 1000)
                            })
                    } else {
                        this.$message.error('登录失败！')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /*background: linear-gradient(red, blue);*/
        .loginDiv {
            position: absolute;
            width: 300px;
            /*height: 240px;*/
            margin-left: -200px;
            left: 50%;
            margin-top: -150px;
            top: 40%;
            padding: 30px 50px 10px;

            h4 {
                margin-bottom: 20px;
                color: #fff;
                font-size: 24px;
            }
            .el-form-item {
                .captcha {
                    display: inline-block;
                    width: 180px;
                }
                img {
                    display: inline-block;
                    width: 114px;
                    height: 38px;
                    border: 1px solid #ccc;
                    border-radius: 0;
                }
                .el-button {
                    width: 100%;
                }
            }
        }
    }
</style>
