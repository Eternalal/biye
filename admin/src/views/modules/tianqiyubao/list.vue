<template>
	<div class="main-content">
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"width":"10%","margin":"0 0 20px 10px"}' :inline="true" :model="searchForm">
				<el-row :style='{"flexDirection":"column","display":"flex"}' >
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}'>
						<label :style='{"margin":"0 10px 0 0", "textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">城市</label>
						<el-input v-model="searchForm.chengshi" placeholder="城市" clearable></el-input>
					</div>
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}' class="select" label="天气" prop="tianqi">
						<label :style='{"margin":"0 10px 0 0", "textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">天气</label>
						<el-select  @change="tianqiChange" clearable v-model="searchForm.tianqi" placeholder="请选择天气">
							<el-option v-for="(item,index) in tianqiOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","outline":"none","margin":"6px 0 0", "borderRadius":"30px","background":"#67D4B2", "width":"100%","fontSize":"14px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"10px 0","flexDirection":"column","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none", "borderRadius":"30px","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('tianqiyubao','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none", "borderRadius":"30px","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('tianqiyubao','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>




				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#6F6F97","borderWidth":"1px","background":"#fff","width":"100%","borderStyle":"solid","height":"fit-content"}' 
					v-if="isAuth('tianqiyubao','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="索引" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="chengshi"
					label="城市">
						<template slot-scope="scope">
							{{scope.row.chengshi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="fengmian" width="200" label="封面">
						<template slot-scope="scope">
							<div v-if="scope.row.fengmian">
								<img v-if="scope.row.fengmian.substring(0,4)=='http'" :src="scope.row.fengmian.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.fengmian.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="tianqi"
					label="天气">
						<template slot-scope="scope">
							{{scope.row.tianqi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="qiwen"
					label="气温">
						<template slot-scope="scope">
							{{scope.row.qiwen}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="shidu"
					label="湿度">
						<template slot-scope="scope">
							{{scope.row.shidu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="fengxiang"
					label="风向">
						<template slot-scope="scope">
							{{scope.row.fengxiang}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="fengsu"
					label="风速">
						<template slot-scope="scope">
							{{scope.row.fengsu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="shiyichuxing"
					label="适宜出行">
						<template slot-scope="scope">
							{{scope.row.shiyichuxing}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="chuanyituijian"
					label="穿衣推荐">
						<template slot-scope="scope">
							{{scope.row.chuanyituijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="gengxinshijian"
					label="更新时间">
						<template slot-scope="scope">
							{{scope.row.gengxinshijian}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none", "borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('tianqiyubao','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none", "borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('tianqiyubao','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none", "borderRadius":"30px", "width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('tianqiyubao','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
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

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
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








    init () {
          this.tianqiOptions = "晴天,阴天,小雨,中雨,大雨,暴雨,阵雨,降雪,冰雹".split(',')
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
      }
           if(this.searchForm.chengshi!='' && this.searchForm.chengshi!=undefined){
            params['chengshi'] = '%' + this.searchForm.chengshi + '%'
          }
           if(this.searchForm.tianqi!='' && this.searchForm.tianqi!=undefined){
            params['tianqi'] = this.searchForm.tianqi
          }
    params['sort'] = 'gengxinshijian';
    params['order'] = 'desc';
      this.$http({
        url: "tianqiyubao/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
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
          url: "tianqiyubao/delete",
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