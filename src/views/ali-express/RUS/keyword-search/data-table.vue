<template>
  <div class="ali-keyword-search">
    <div v-if="isShow" class="table-info">
      <p>{{ info.category }}</p>
      <p>{{ info.result }}</p>
    </div>
    <el-table
      v-loading="isLoading"
      ref="filterTable"
      :highlight-current-row="isHighLight"
      :row-style="selectedHighlight"
      :height="height"
      :data="reTable.slice((info.currentPage - 1) * info.pageSize, info.currentPage * info.pageSize)"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      resizable
      row-key="number"
      lazy="true"
      border
      element-loading-text="拼命加载中"
      @sort-change="sort_change">
      <el-table-column label="搜索排序" sortable prop="number" align="center" width="95">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.number }}</span>
          <span
            v-loading="scope.row.isGoodTrackLoading"
            class="block link"
            style="cursor:pointer"
            element-loading-text="拼命加载中"
            @click="good_follow(scope),handleClick(scope)"
          >{{ scope.row.is_focus_goods ? '>>我的关注':'关注' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" width="90">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.goods_img" width="200px" height="200px" @click="show_big(data)">
            <span slot="reference">
              <!-- width="90px" -->
              <img
                v-lazy="scope.row.goods_img"
                :key="scope.row.goods_img"
                height="60px"
                style="border:none"
              >
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <ui-tip :content="scope.row.goods_title" :url="scope.row.goods_url" :is-link="true"/>
        </template>
      </el-table-column>
      <el-table-column label="评论数" sortable prop="review" align="center" width="100">
        <template slot-scope="scope" >
          <span class="block">{{ scope.row.review }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近6个月销量" sortable prop="goods_sales" align="center" width="130">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.goods_sales }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量-评论" sortable prop="difference_value" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.difference_value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低价" sortable prop="goods_min_price" align="center" width="115">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_min_price ? `${scope.row.currency}${scope.row.goods_min_price}`: '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最高价" prop="goods_max_price" align="center" sortable width="115">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_max_price ? `${scope.row.currency}${scope.row.goods_max_price}`: '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Listing评分" prop="goods_grade" sortable align="center" width="115">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_grade ? `${scope.row.goods_grade}` : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺" align="center" width="280">
        <template slot-scope="scope">
          <ui-tip :content="scope.row.store_name" :url="scope.row.store_url" :is-link="true"><div v-if="scope.row.is_gold_sellers" class="gold"/></ui-tip>
          <span
            v-if="scope.row.is_track_store "
            class="link"
            style="cursor:pointer"
            @click="router_push_shop_track(scope)"
          >{{ ">>我的店铺跟踪" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="info.currentPage"
        :page-sizes="[50, 100, 200, 480]"
        :page-size="info.pageSize"
        :total="table.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<style lang="scss">
.ali-keyword-search {
    .gold {
        display: inline-block;
        width: 15px;
        height: 20px;
        background: url('../../../../assets/glod.png') no-repeat center center;
        background-size: cover;
        vertical-align: middle
    }
}
.el-table td {
  padding: 0;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}
.el-table .cell,
.el-table th div {
  padding: 0;
}
p.el-table .cell,
.el-table th div {
  padding-right: 0 !important;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.img-cell {
  width: 180px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-table td,
.el-table th {
  padding: 0;
}
.el-table thead {
  color: #333;
}
.el-table th {
  background-color: rgb(239, 242, 247);
}
.pagination {
  float: right;
}
// .el-table td, .el-table th,.el-table tr {
// 	border-color: #ccc
// }
.img-cell {
  width: 200px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
.table {
  border: 1px solid rgb(128, 128, 128);
  border-collapse: collapse;
  td {
    border: 1px solid rgb(128, 128, 128);
  }
  th {
    border: 1px solid rgb(128, 128, 128);
  }
  tr {
    border: 1px solid rgb(128, 128, 128);
  }
}
.table-info {
  height: 65px;
  width: 100%;
}
</style>

<script>
import { aliexpress_add_goods_focus } from '@/api/ali-keyword-search'
export default {
  components: {
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    // tableLoading: {
    //     type: Boolean
    // }
    table: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHighLight: true,
      tableLoading: false
    }
  },
  computed: {
    // tables: {
    //   get() {
    //     return this.table
    //   },
    //   set(val) {
    //     return this.table = val
    //   }
    // },
    // 默认排序
    reTable() {
      return this.table
    }
  },
  methods: {
    router_push_shop_track(scope) {
      this.$emit('router_push_shop_track', scope.row.store_id)
    },
    // 排序
    sort_change(val) {
      if (val.order === 'ascending') {
        this.table.sort((a, b) => {
          return a[val.prop] - b[val.prop]
        })
      } else if (val.order === 'descending') {
        this.table.sort((a, b) => {
          return b[val.prop] - a[val.prop]
        })
      } else {
        this.table.sort((a, b) => {
          return a['number'] - b['number']
        })
      }
    },
    handleSizeChange(val) {
      this.info.pageSize = val
    },
    handleCurrentChange(val) {
      this.info.currentPage = val
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    // 设置颜色
    selectedHighlight({ row, rowIndex }) {
      for (let i = 0; i <= this.table.length - 1; i++) {
        // if (
        //     // this.table[this.tables.colorArr[i]].clickIndex === rowIndex
        //   this.table[i].clickIndex === rowIndex
        // ) {
        if (row.is_track_store && row.is_focus_goods) {
          return {
            'background-color': '#c0f2e6'
          }
        }
        if (row.is_focus_goods) {
          return {
            'background-color': '#e6faf5'
          }
        }
        if (row.is_track_store) {
          return {
            'background-color': '#ccf5eb'
          }
        }
        // }
      }
    },
    // 点击换颜色
    handleClick(scope) {
    //   this.$set(this.table[scope.$index], "clickIndex", scope.$index)
    },
    // 商品跟踪
    good_follow(scope) {
      const data = {
        start_focus_time: new Date().getTime(),
        ...scope.row
      }
      if (this.table[scope.$index].is_focus_goods) {
        this.$emit('router_push_listing_follow', scope.row.goods_id)
      } else {
        this.$set(this.table[scope.$index], 'isGoodTrackLoading', true)
        aliexpress_add_goods_focus(data)
          .then(res => {
            this.$set(this.table[scope.$index], 'isGoodTrackLoading', false)
            if (res.status) {
              this.$message({ type: 'success', message: res.message })
              this.$set(this.table[scope.$index], 'is_focus_goods', 1)
            } else if (res.status === 0) {
              this.$message({ type: 'success', message: res.message })
              this.$set(this.table[scope.$index], 'is_focus_goods', 1)
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(() => {
            this.$message.error('请求服务器出错')
          })
      }
    }
  }
}
</script>
