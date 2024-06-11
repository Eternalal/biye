<template>
	<div class="login-container">
		<div class="login-wrapper">
		<div class="header">Login</div>
		<el-form ref="loginForm" :model="loginForm"  :rules="rules">
			<el-form-item v-if="loginType==1" class="list-item" prop="username">
				<input v-model="loginForm.username" placeholder="请输入账户" class="input-item">
			</el-form-item>
			<el-form-item v-if="loginType==1" class="list-item" prop="password">
				<input  v-model="loginForm.password" placeholder="请输入密码" type="password" class="input-item">
			</el-form-item>
			<el-form-item v-if="roles.length>1" class="list-type"  prop="role">
				<el-radio v-model="loginForm.tableName" :label="item.tableName" v-for="(item, index) in roles" :key="index" @change.native="getCurrentRow(item)">{{item.roleName}}</el-radio>
			</el-form-item>
			<el-form-item >
				<el-button v-if="loginType==1"  @click="submitForm('loginForm')" class="btn">登录</el-button>
			</el-form-item>
			<div >
			<router-link :to="{path: '/register', query: {role: item.tableName,pageFlag:'register'}}" v-if="item.hasFrontRegister=='是'" v-for="(item, index) in roles" :key="index">注册{{item.roleName.replace('注册','')}}</router-link>
			</div>
		</el-form>
		</div>
    </div>
	<!-- <div class="login-container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="username" v-model="loginForm.username" class="input-item">
                <input type="password" name="password" placeholder="password" v-model="loginForm.password" class="input-item">
                <button class="btn"  @click="submitForm('loginForm')">Login</button>
            </div>
			<el-form-item v-if="roles.length>1" class="list-type" :style='{"width":"80%","margin":"20px auto"}' prop="role">
				<el-radio v-model="loginForm.tableName" :label="item.tableName" v-for="(item, index) in roles" :key="index" @change.native="getCurrentRow(item)">{{item.roleName}}</el-radio>
			</el-form-item>
            <div class="msg">
                Don't have account?
                <a href="#">Sign up</a>
            </div>
        </div>
    </div> -->
</template>

<script>

export default {
	//数据集合
	data() {
		return {
            baseUrl: this.$config.baseUrl,
            loginType: 1,
			roleMenus: [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"appFrontIcon":"cuIcon-goodsnew","buttons":["新增","查看","修改","删除"],"menu":"天气预报","menuJump":"列表","tableName":"tianqiyubao"}],"menu":"天气预报管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["新增","查看","修改","删除","查看评论"],"menu":"景点信息","menuJump":"列表","tableName":"jingdianxinxi"}],"menu":"景点信息管理"},{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看","删除"],"menu":"门票预订","menuJump":"列表","tableName":"menpiaoyuding"}],"menu":"门票预订管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["新增","查看","修改","删除","查看评论"],"menu":"酒店信息","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息管理"},{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","删除"],"menu":"酒店预订","menuJump":"列表","tableName":"jiudianyuding"}],"menu":"酒店预订管理"},{"child":[{"appFrontIcon":"cuIcon-wenzi","buttons":["新增","查看","修改","删除","查看评论"],"menu":"餐厅信息","menuJump":"列表","tableName":"cantingxinxi"}],"menu":"餐厅信息管理"},{"child":[{"appFrontIcon":"cuIcon-taxi","buttons":["查看","删除"],"menu":"餐厅预订","menuJump":"列表","tableName":"cantingyuding"}],"menu":"餐厅预订管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除","查看评论"],"menu":"交通路线","menuJump":"列表","tableName":"jiaotongluxian"}],"menu":"交通路线管理"},{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["查看","删除","查看评论"],"menu":"旅行日记","menuJump":"列表","tableName":"lvxingriji"}],"menu":"旅行日记管理"},{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["查看","删除"],"menu":"旅游规划","menuJump":"列表","tableName":"lvyouguihua"}],"menu":"旅游规划管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["查看","订门票"],"menu":"景点信息列表","menuJump":"列表","tableName":"jingdianxinxi"}],"menu":"景点信息模块"},{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["查看","订酒店"],"menu":"酒店信息列表","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息模块"},{"child":[{"appFrontIcon":"cuIcon-full","buttons":["查看","订餐厅"],"menu":"餐厅信息列表","menuJump":"列表","tableName":"cantingxinxi"}],"menu":"餐厅信息模块"},{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["查看"],"menu":"交通路线列表","menuJump":"列表","tableName":"jiaotongluxian"}],"menu":"交通路线模块"},{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看"],"menu":"旅行日记列表","menuJump":"列表","tableName":"lvxingriji"}],"menu":"旅行日记模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看","支付"],"menu":"门票预订","menuJump":"列表","tableName":"menpiaoyuding"}],"menu":"门票预订管理"},{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","支付"],"menu":"酒店预订","menuJump":"列表","tableName":"jiudianyuding"}],"menu":"酒店预订管理"},{"child":[{"appFrontIcon":"cuIcon-taxi","buttons":["查看","支付"],"menu":"餐厅预订","menuJump":"列表","tableName":"cantingyuding"}],"menu":"餐厅预订管理"},{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["新增","查看","修改","删除","查看评论"],"menu":"旅行日记","menuJump":"列表","tableName":"lvxingriji"}],"menu":"旅行日记管理"},{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["新增","查看","修改","删除"],"menu":"旅游规划","menuJump":"列表","tableName":"lvyouguihua"}],"menu":"旅游规划管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["查看","订门票"],"menu":"景点信息列表","menuJump":"列表","tableName":"jingdianxinxi"}],"menu":"景点信息模块"},{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["查看","订酒店"],"menu":"酒店信息列表","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息模块"},{"child":[{"appFrontIcon":"cuIcon-full","buttons":["查看","订餐厅"],"menu":"餐厅信息列表","menuJump":"列表","tableName":"cantingxinxi"}],"menu":"餐厅信息模块"},{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["查看"],"menu":"交通路线列表","menuJump":"列表","tableName":"jiaotongluxian"}],"menu":"交通路线模块"},{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看"],"menu":"旅行日记列表","menuJump":"列表","tableName":"lvxingriji"}],"menu":"旅行日记模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}],
			loginForm: {
				username: '',
				password: '',
				tableName: '',
				code: '',
			},
			role: '',
            roles: [],
			rules: {
				username: [
					{ required: true, message: '请输入账户', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			codes: [{
				num: 1,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 2,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 3,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 4,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}]
		}
	},
	created() {
        for(let item in this.roleMenus) {
            if(this.roleMenus[item].hasFrontLogin=='是') {
                this.roles.push(this.roleMenus[item]);
            }
        }
	},
	mounted() {
	},
    //方法集合
    methods: {
		randomString() {
			var len = 4;
			var chars = [
			  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			  'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
			  'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
			  '3', '4', '5', '6', '7', '8', '9'
			]
			var colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
			var sizes = ['14', '15', '16', '17', '18']
			
			var output = []
			for (var i = 0; i < len; i++) {
			  // 随机验证码
			  var key = Math.floor(Math.random() * chars.length)
			  this.codes[i].num = chars[key]
			  // 随机验证码颜色
			  var code = '#'
			  for (var j = 0; j < 6; j++) {
			    var key = Math.floor(Math.random() * colors.length)
			    code += colors[key]
			  }
			  this.codes[i].color = code
			  // 随机验证码方向
			  var rotate = Math.floor(Math.random() * 45)
			  var plus = Math.floor(Math.random() * 2)
			  if (plus == 1) rotate = '-' + rotate
			  this.codes[i].rotate = 'rotate(' + rotate + 'deg)'
			  // 随机验证码字体大小
			  var size = Math.floor(Math.random() * sizes.length)
			  this.codes[i].size = sizes[size] + 'px'
			}
		},
      getCurrentRow(row) {
        this.role = row.roleName;
      },
      submitForm(formName) {
        if (this.roles.length!=1) {
            if (!this.role) {
                this.$message.error("请选择登录用户类型");
                return false;
            }
        } else {
            this.role = this.roles[0].roleName;
            this.loginForm.tableName = this.roles[0].tableName;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get(`${this.loginForm.tableName}/login`, {params: this.loginForm}).then(res => {
              if (res.data.code === 0) {
                localStorage.setItem('Token', res.data.token);
                localStorage.setItem('UserTableName', this.loginForm.tableName);
                localStorage.setItem('username', this.loginForm.username);
                localStorage.setItem('adminName', this.loginForm.username);
                localStorage.setItem('sessionTable', this.loginForm.tableName);
                localStorage.setItem('role', this.role);
                localStorage.setItem('keyPath', this.$config.indexNav.length+2);
                this.$router.push('/index/center');
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1500,
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	* {
            margin: 0;
            padding: 0;
        }
        .login-container {
            height: 100%;
            background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
        }
        .login-wrapper {
            background-color: #fff;
            width: 358px;
            height: 588px;
            border-radius: 15px;
            padding: 0 50px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .header {
            font-size: 38px;
            font-weight: bold;
            text-align: center;
            line-height: 200px;
        }
        .input-item {
            display: block;
            width: 100%;
            margin-bottom: 20px;
            border: 0;
            padding: 10px;
            border-bottom: 1px solid rgb(128, 125, 125);
            font-size: 15px;
            outline: none;
        }
        .input-item:placeholder {
            text-transform: uppercase;
        }
        .btn {
            text-align: center;
            padding: 10px;
            width: 100%;
            margin-top: 40px;
            background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
            color: #fff;
        }
        .msg {
            text-align: center;
            line-height: 88px;
        }
        a {
            text-decoration-line: none;
            color: #abc1ee;
        }
</style>
