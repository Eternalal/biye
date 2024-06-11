<template>
	<div class="layout-container">
	  <index-header class="navbar"></index-header>
	  <div class="main-layout">
		<index-aside class="index-aside"></index-aside>
		<el-main class="main-content">
		  <!-- <bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs> -->
		  <router-view class="router-view"></router-view>
		</el-main>
	  </div>
	</div>
  </template>
  
  <script>
  import IndexAside from '@/components/index/IndexAsideStatic';
  import IndexHeader from '@/components/index/IndexHeader';
  import menu from "@/utils/menu";
  
  export default {
	components: {
	  IndexAside,
	  IndexHeader
	},
	data() {
	  return {
		menuList: [],
		role: "",
		currentIndex: -2,
		itemMenu: [],
		title: '',
	  };
	},
	mounted() {
	  let menus = menu.list();
	  this.menuList = menus;
	  this.role = this.$storage.get("role");
	},
	created() {
	  this.init();
	},
	methods: {
	  init() {
		this.$nextTick(() => {});
	  },
	  menuHandler(menu) {
		this.$router.push({
		  name: menu.tableName
		});
		this.title = menu.menu;
	  },
	  titleChange(index, menus) {
		this.currentIndex = index;
		this.itemMenu = menus;
		console.log(menus);
	  },
	  homeChange(index) {
		this.itemMenu = [];
		this.title = "";
		this.currentIndex = index;
		this.$router.push({
		  name: 'home'
		});
	  },
	  centerChange(index) {
		this.itemMenu = [{
		  "buttons": ["新增", "查看", "修改", "删除"],
		  "menu": "修改密码",
		  "tableName": "updatePassword"
		}, {
		  "buttons": ["新增", "查看", "修改", "删除"],
		  "menu": "个人信息",
		  "tableName": "center"
		}];
		this.title = "";
		this.currentIndex = index;
		this.$router.push({
		  name: 'home'
		});
	  }
	}
  };
  </script>
  
  <style lang="scss" scoped>
  .layout-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
  }
  
  .navbar {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #fff;
	z-index: 1000;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3020);
	padding: 8px 20px;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  
  .main-layout {
	display: flex;
	flex: 1;
	margin-top: 60px; /* 调整为匹配导航栏高度 */
  }
  
  .index-aside {
	width: 200px;
	background: #fff;
	box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3020);
	position: fixed;
	top: 60px; /* 调整为匹配导航栏高度 */
	left: 0;
	height: calc(100% - 60px); /* 调整为匹配导航栏高度 */
	z-index: 1001;
  }
  
  .main-content {
	//margin-left: 100px; /* 调整为匹配侧边栏宽度 */
	padding: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
  }
  
  .bread-crumbs {
	padding: 0 20px;
	margin: 10px auto;
	border-color: #67d4b2;
	align-items: center;
	border-width: 2px;
	background: #f8f6f7;
	display: flex;
	width: calc(100% - 60px);
	border-style: solid;
	height: 40px;
  }
  
  .router-view {
	margin-left: 200px;
	flex: 1; /* 确保路由视图占满剩余空间 */
	padding: 30px;
	background-attachment: fixed;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	display: flex;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	height: auto; /* 根据需要调整高度 */
  }
  </style>
  