<template>
	<div class="main-content">
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"width":"10%","margin":"0 0 20px 10px"}' :inline="true" :model="searchForm">
				<el-row :style='{"flexDirection":"column","display":"flex"}' >
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#000","textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">用户名</label>
						<el-input v-model="searchForm.nickname" placeholder="用户名" clearable></el-input>
					</div>
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#000","textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">评论内容</label>
						<el-input v-model="searchForm.content" placeholder="评论内容" clearable></el-input>
					</div>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","outline":"none","margin":"6px 0 0","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"10px 0","flexDirection":"column","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","borderRadius":"30px","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('discussjingdianxinxi','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","borderRadius":"30px","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('discussjingdianxinxi','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#6F6F97","borderWidth":"1px","background":"#fff","width":"100%","borderStyle":"solid","height":"fit-content"}' 
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="索引" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="nickname"
					label="用户名">
						<template slot-scope="scope">
							{{scope.row.nickname}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="content"
					label="评论内容">
						<template slot-scope="scope">
							{{scope.row.content}}
						</template>
					</el-table-column>

          <el-table-column :resizable='true' :sortable='false'  
						prop="content"
					label="评论类型">
            <el-tag :type="getTagType(responseData[scope.row.content])" slot-scope="scope" v-if="responseData[scope.row.content]">{{responseData[scope.row.content]}}</el-tag>
					</el-table-column>

					<el-table-column :resizable='true' :sortable='false'  
						prop="reply"
					label="回复内容">
						<template slot-scope="scope">
							{{scope.row.reply}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('discussjingdianxinxi','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('discussjingdianxinxi','查看评论')" type="info" size="mini" @click="disscussListHandler(scope.row.id)">评论</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">回复</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if="" type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="true"
					:style='{"padding":"0","margin":"20px 0","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





	</div>
</template>

<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      layouts: ["total","prev","pager","next","sizes","jumper"],
      commentData: {},  
      receivedInfoArray: [],
      responseData: {},
      isTagVisible: false, // 控制标签是否可见的变量  

    };
  },
  created() {
    
  },
  mounted() {
    this.init();
    this.getDataList();
    this.contentStyleChange();
    // this.processDataList(); 
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },


    getTagType(content) {  
    // 根据 content 的值返回不同的类型  
    switch (content) {  
      case '好评': // 假设 content 为 'positive' 时显示绿色标签  
        return 'success';  
      case '差评': // 假设 content 为 'negative' 时显示红色标签  
        return 'danger';   
      // 其他情况返回默认类型  
      default:  
        return 'warning';  
    }  
  } ,

//     func(postData) {  

//     const data2 = fetch('http://127.0.0.1:5000/lstm', {  
//         method: 'POST', // 使用POST方法  
//         headers: {  
//             'Content-Type': 'application/json', // 设置Content-Type为application/json  
//         },  
//         body: JSON.stringify({ info: postData }), 
//     });
//     data2.then()

// //     .then(response => response.json()) 
// //     .then(data => {  
// //     // 此时，data 就是服务器返回的JSON对象  
// //     // console.log(data.received_info); 
// //     return data.received_info// 输出 "active"  
// // }) ;

// },




// 声明一个async函数  
async func(postData) {  
  try {  
    // 发起fetch请求  
    const response = await fetch('http://127.0.0.1:5000/lstm', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({ info: postData }), // 假设这是你的postData  
    });  
  
    // 确保请求成功  
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
  
    // 解析响应体为JSON  
    const data = await response.json();
    // this.receivedInfoArray.push(data.received_info);  
    this.responseData[postData] = data.received_info;
    console.log(this.responseData)
  
    // 使用data（它现在是一个JavaScript对象）  
  } catch (error) {  
    console.error('There has been a problem with your fetch operation:', error);  
  }  
},  

processDataList() {  
    // 确保 dataList 已经被赋值  
    if (this.dataList.length > 0) {  
      // 使用 map 和 Promise.all 来处理异步操作  
      const promises = this.dataList.map(item => this.func(item.content));  
      Promise.all(promises).then(results => {  
        // 所有请求都已完成  
        console.log('所有请求已完成', results);  
      }).catch(error => {  
        // 如果有任何一个请求失败  
        console.error('处理请求时发生错误', error);  
      });  
    } else {  
      console.log('dataList 为空，无需处理');  
    }  
  },  



    init () {
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
        refid : this.$route.query.refid,
      }
           if(this.searchForm.nickname!='' && this.searchForm.nickname!=undefined){
            params['nickname'] = '%' + this.searchForm.nickname + '%'
          }
           if(this.searchForm.content!='' && this.searchForm.content!=undefined){
            params['content'] = '%' + this.searchForm.content + '%'
          }
      this.$http({
        url: "discussjingdianxinxi/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;

          this.processDataList();

        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discussdiscussjingdianxinxi',query:{refid:id}});
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "discussjingdianxinxi/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style></style>