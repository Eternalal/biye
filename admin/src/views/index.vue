<template>
	<el-container class="full-screen-container">
	  <index-main></index-main>
	</el-container>
  </template>
  
  <script>
  import IndexMain from '@/components/index/IndexMain'
  export default {
	components: {
	  IndexMain
	}
  }
  </script>
  
  <style lang="scss" scoped>
  .full-screen-container {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	display: block;
  }
  </style>
  
