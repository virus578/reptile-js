<template>
  <div  class="c-data-table" element-loading-text="拼命加载中" @update:colorArr="$emit('input',colorArr)" >
    <el-table
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      :highlight-current-row="isHighLight"
      :data="trackList"
      :row-style="selectedHighlight"
      height="710"
      border
      style="width: 100%"
      row-key="id">
      <el-table-column
        label="跟踪状态"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.track_status ? '跟踪中' : '已过期' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="跟踪时间"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.start_focus_date }}</span>
          <span class="block">{{ scope.row.start_focus_hour }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="图片"
        align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img
              v-lazy="scope.row.goods_img"
              :key="scope.row.goods_img"
              width="200px"
              height="200px" >
            <span slot="reference">
              <img
                v-lazy="scope.row.goods_img"
                height="60px"
                width="90px"
                style="border:none" >
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        align="center">
        <template slot-scope="scope">
          <ui-tip
            :content="scope.row.goods_title"
            :url="scope.row.goods_url"
            :is-link="true" />
        </template>
      </el-table-column>
      <el-table-column
        label="类目"
        show-overflow-tooltip
        width="200"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.search_category[0] }}</span>
          <div v-if="scope.row.search_category.length > 1">
            <span class="block">{{ `>${scope.row.search_category[1]}` }}</span>
            <span class="block">{{ `>${scope.row.search_category[2]}` }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="关键字"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.key_word.length">
            <el-popover
              placement="top"
              width="100"
              height="400"
              trigger="click">
              <span v-for="(item) in scope.row.key_word" :key="item.key_word" class="center block">
                {{ item }}
              </span>
              <div slot="reference">
                <span style="cursor:pointer">{{ scope.row.key_word[0] }}</span>
                <span v-if="scope.row.key_word.length > 1" class="block">...</span>
              </div>
            </el-popover>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="搜索排序"
        align="center"
        width="90">
        <template slot-scope="scope" >
          <span class="block">{{ scope.row.search_result_sort }}</span>
          <span v-if="scope.row.search_result_sortType" class="block">新品排序</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论数"
        align="center"
        width="90">
        <template slot-scope="scope" >
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              :options="scope.row.$review_value.options"
              :id="scope.row.$review_value.id" />
            <span
              slot="reference"
              class="name-wrapper">
              {{ scope.row.$review_value.value }}
            </span>
          </el-popover>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="近6月销量"
        align="center"
        width="90">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              :options="scope.row.$goods_sales.options"
              :id="scope.row.$goods_sales.id" />
            <span
              slot="reference"
              class="name-wrapper">
              {{ scope.row.$goods_sales.value }}
            </span>
          </el-popover>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="销量-评论"
        prop="fifiteenSaleNum.value"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              :options="scope.row.$difference_value.options"
              :id="scope.row.$difference_value.id" />
            <span
              slot="reference"
              class="name-wrapper">
              {{ scope.row.$difference_value.value }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span class="block">{{ `${scope.row.currency}${scope.row.goods_min_price}` }}</span>
          <span
            v-if="scope.row.goods_max_price"
            class="block"
          >
            -
          </span>
          <span
            v-if="scope.row.goods_max_price"
            class="block"
          >
            {{ `${scope.row.currency}${scope.row.goods_max_price}` }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Listing评分"
        prop="fifiteenSaleNum.value"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_grade ? scope.row.goods_grade === '0.0' ? '--' : scope.row.goods_grade : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="店铺"
        align="center">
        <template slot-scope="scope">
          <ui-tip
            :content="scope.row.store_name"
            :url="scope.row.store_url"
            :is-link="true">
            <div v-if="scope.row.is_gold_sellers" class="gold"/>
          </ui-tip>
          <span
            v-loading="scope.row.isShopTrackLoading"
            class="link block"
            style="cursor:pointer"
            element-loading-text="拼命加载中"
            @click="shop_track(scope),handleClick(scope,'is_track_store')" >
            {{ scope.row.is_track_store ? ">>我的店铺跟踪" : "跟踪" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="最近更新时间"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.recently_track_date }}</span>
          <span class="block">{{ scope.row.recently_track_hour }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_name"
        width="90"
        label="关注人"
        align="center"/>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="paginate.currentPage"
        :page-sizes="[50, 100, 200, 400]"
        :page-size="50"
        :total="paginate.count"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handle_size_change"
        @current-change="handle_current_change"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-data-table {
    .gold {
        display: inline-block;
        width: 15px;
        height: 20px;
        background: url('../../../../assets/glod.png') no-repeat center center;
        background-size: cover;
        vertical-align: middle
    }
	.el-table td, .el-table th {
		padding: 0;
	}
	.el-table thead {
		color: #333
	}
	.el-table th {
		background-color: rgb(239, 242, 247)
	}
	.pagination {
		padding: 0;
        margin-top:6px;
		float: right;
	}
	.el-table td, .el-table th {
		border-color: #ccc
	}
	.img-cell {
		width: 200px;
		height: 100px;
		img {
			width: 100%;
			height: 100%;
		}
	}
    .table {
        border: 1px solid #ccc;
        border-collapse:collapse;
        td {
             border: 1px solid #ccc;
        }
        th {
             border: 1px solid #ccc;
        }
        tr {
            border: 1px solid #ccc;
        }
    }
}
</style>

<script>

import { aliexpress_add_storeTrack } from '@/api/ali-listing-track'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default
  },
  props: {
    trackList: {},
    paginate: {
      type: Object,
      default: () => {}
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
    // value:{}
  },
  data() {
    return {
      heades: ['类型', '值'],
      isTh: true,
      isDate: true,
      arr: [],
      isHighLight: true,
      value: {}
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.ali_us.tableData
    })
  },
  methods: {
    ...mapMutations({
      set_ali_us_table_color: 'set_ali_us_table_color'
    }),
    // el-popover 只能实现hover 用dioloag实现点击
    is_show(index, params) {
      this.$set(this.trackList[index], params, true)
    },
    handle_size_change(val) {
      this.paginate.pageSize = val
      this.$emit('search', true)
    },
    handle_current_change(val) {
      this.paginate.currentPage = val
      this.$emit('search', true)
    },
    shop_track(scope) {
      const data = {
        start_track_time: new Date(),
        store_id: scope.row.store_id,
        store_name: scope.row.store_name,
        is_gold_sellers: scope.row.is_gold_sellers,
        store_url: scope.row.store_url
      }
      if (scope.row.is_track_store) {
        this.$emit('router_push_shop_track', scope.row.store_id)
      } else {
        this.$set(this.trackList[scope.$index], 'isShopTrackLoading', true)
        aliexpress_add_storeTrack(data).then(res => {
          this.$set(this.trackList[scope.$index], 'isShopTrackLoading', false)
          if (res.status) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$set(this.trackList[scope.$index], 'is_track_store', true)
            this.tableData.table.forEach((item, index) => {
              if (item.store_id === scope.row.store_id) {
                this.set_ali_us_table_color({ index, name: 'is_track_store' })
              }
            })
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {this.$message.error('请求服务器出错')})
      }
    },
    selectedHighlight({ row, rowIndex }) {
      for (let i = 0; i <= this.trackList.length - 1; i++) {
        if (row.is_track_store) {
          return {
            'background-color': '#fff2e6'
          }
        }
      }
    },
    handleClick(scope, params) {
      // this.$set(this.trackList[scope.$index],params,1)
    }
  }
}
</script>
