<template>
  <div class="container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
              <div class="list-item" v-if="loginType === 1" v-for="(item, index) in loginItems" :key="index">
                  <input class="input-item" :placeholder="item.placeholder" :type="item.type" v-model="rulesForm[item.model]" />
              </div>
              <div class="list-type" v-if="roles.length > 1">
          <el-radio-group v-model="rulesForm.role">
            <el-radio :label="item.roleName" v-for="item in roles" :key="item.roleName">{{ item.roleName }}</el-radio>
          </el-radio-group>
         </div>
                <div class="btn" @click="login()" v-if="loginType === 1">Login</div>
            </div>
        </div>
    </div>
</template>

<script>
import menu from "@/utils/menu";

export default {
  data() {
    return {
      baseUrl: this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
        code: '',
      },
      menus: [],
      roles: [],
      tableName: "",
      pageTitle: "自助旅游智能服务系统登录",
      loginItems: [
        { label: "用户名", placeholder: "请输入用户名", type: "text", model: "username" },
        { label: "密码", placeholder: "请输入密码", type: "password", model: "password" }
      ]
    };
  },
  computed: {
    formContainerStyle() {
      return {
        padding: "40px 20px 20px",
        boxShadow: "0 0px 0px rgba(64, 158, 255, .8)",
        margin: "0 auto", // 居中显示
        borderRadius: "0",
        background: "transparent",
        width: "calc(100vw - 660px)",
        height: "auto",
      };
    }
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    this.roles = menus.filter(menu => menu.hasBackLogin === '是');
  },
  methods: {
    login() {
      if (!this.rulesForm.username || !this.rulesForm.password) {
        this.$message.error("请输入用户名和密码");
        return;
      }

      if (this.roles.length > 1) {
        if (!this.rulesForm.role) {
          this.$message.error("请选择角色");
          return;
        }
        this.tableName = this.roles.find(role => role.roleName === this.rulesForm.role).tableName;
      } else {
        this.tableName = this.roles[0].tableName;
        this.rulesForm.role = this.roles[0].roleName;
      }

      const url = `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`;
      this.$http.post(url)
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.$storage.set("Token", data.token);
            this.$storage.set("role", this.rulesForm.role);
            this.$storage.set("sessionTable", this.tableName);
            this.$storage.set("adminName", this.rulesForm.username);
            this.$router.replace({ path: "/index/" });
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          console.error("登录失败：", err);
          this.$message.error("登录失败，请稍后重试");
        });
    }
  }
};
</script>

      
<style scoped>
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
}
body {
    height: 100%;
}
.container {
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