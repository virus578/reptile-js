<template>
  <div class>
    <div v-if="isShow" class="table-info">
      <p>{{ info.category }}</p>
      <p>{{ info.result }}</p>
    </div>
    <!-- v-loading="tableLoading"
        element-loading-text="拼命加载中" -->
    <!-- row-key="number" -->
    <el-table
      ref="filterTable"
      :data="table.slice((info.currentPage - 1) * info.pageSize,info.currentPage * info.pageSize)"
      :height="height"
      :highlight-current-row="isHighLight"
      :row-class-name="tableRowClassName"
      :row-style="selectedHighlight"
      style="width: 100%"
      resizable
      lazy="true"
      border
      @sort-change="sort_change">
      <el-table-column label="搜索排序" sortable prop="number" align="center" width="95">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.site }}</span>
          <span
            v-loading="scope.row.isGoodTrackLoading"
            class="block link"
            style="cursor:pointer"
            element-loading-text="拼命加载中"
            @click="good_track(scope),handleClick(scope)"
          >{{ scope.row.is_goods_track ? '>>我的跟踪':'跟踪' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" width="90">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <!-- :src="scope.row.goods_img" -->
            <img :src="scope.row.goods_img" width="200px" height="200px" @click="show_big(data)">
            <span slot="reference">
              <!-- v-lazy="scope.row.goods_img" -->
              <!-- :src="scope.row.goods_img" -->
              <!-- :key="scope.row.goods_img" -->
              <img
                v-lazy="scope.row.goods_img"
                height="60px"
                width="90px"
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
      <el-table-column label="近7天销量" sortable prop="smallSale" align="center" width="100">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            trigger="click"
            placement="top"
            transition="fade-in-linear">
            <po-table
              v-if="scope.row.smallSaleStatus"
              :table="scope.row.marketing.small_message.numberVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.small_message.numberVariant,'近7天销量',scope.$index)"
              :id="Date.now()"/>
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'smallSaleStatus')">
              {{ Number(scope.row.marketing.small_message.sale_number) }}
            </span>
          </el-popover>
          <span class="orange block">{{ scope.row.marketing.small_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近15天销量" sortable prop="middleSale" align="center" width="100">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            trigger="click"
            placement="top"
            transition="fade-in-linear">
            <po-table
              v-if="scope.row.middleSaleStatus"
              :table="scope.row.marketing.middle_message.numberVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.middle_message.numberVariant,'近15天销量',scope.$index)"
              :id="Date.now()"/>
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'middleSaleStatus')">
              {{ scope.row.marketing.middle_message.sale_number }}
            </span>
          </el-popover>
          <span class="orange block">{{ scope.row.marketing.middle_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近30天销量" sortable prop="largeSale" align="center" width="100">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            trigger="click"
            placement="top"
            transition="fade-in-linear">
            <po-table
              v-if="scope.row.largeSaleStatus"
              :table="scope.row.marketing.large_message.numberVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.large_message.numberVariant,'近30天销量',scope.$index)"
              :id="Date.now()"/>
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'largeSaleStatus')">
              {{ scope.row.marketing.large_message.sale_number }}
            </span>
          </el-popover>
          <span class="orange block">{{ scope.row.marketing.large_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近7天销售额" sortable prop="smallPrice" align="center" width="115">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            v-if="Number(scope.row.marketing.small_message.price_number)"
            trigger="click"
            placement="top"
            transition="fade-in-linear"
          >
            <!-- v-if="scope.row.marketing.small_message.priceVariant.length" -->
            <po-table
              v-if="scope.row.smallPriceStatus"
              :table="scope.row.marketing.small_message.priceVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.small_message.priceVariant,'近7天销售额',scope.$index)"
              :id="Date.now()"/>
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'smallPriceStatus')">
              {{ `${scope.row.marketing.price_currency} ${scope.row.marketing.small_message.price_number}` }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="近15天销售额" prop="middlePrice" align="center" sortable width="115">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            v-if="Number(scope.row.marketing.middle_message.price_number)"
            trigger="click"
            placement="top"
            transition="fade-in-linear">
            <!-- v-if="scope.row.marketing.middle_message.priceVariant.length" -->
            <po-table
              v-if="scope.row.middlePriceStatus"
              :table="scope.row.marketing.middle_message.priceVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.middle_message.priceVariant,'近15天销售额',scope.$index)"
              :id="Date.now()"
            />
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'middlePriceStatus')">
              {{ `${scope.row.marketing.price_currency} ${scope.row.marketing.middle_message.price_number}` }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="近30天销售额" prop="largePrice" sortable align="center" width="115">
        <template v-if="scope.row.marketing.marketing_arr.length" slot-scope="scope">
          <el-popover
            v-if="Number(scope.row.marketing.large_message.price_number)"
            trigger="click"
            placement="top"
            transition="fade-in-linear">
            <!-- v-if="scope.row.marketing.large_message.priceVariant.length" -->
            <po-table
              v-if="scope.row.largePriceStatus"
              :table="scope.row.marketing.large_message.priceVariant"
              :params="'count'"
              :heads="filter_attribute(scope.row.marketing.large_message.priceVariant,'近30天销售额',scope.$index)"
              :id="Date.now()"/>
            <span
              slot="reference"
              class="name-wrapper pointer"
              style="cursor: pointer"
              @click="change_status(scope.$index,'largePriceStatus')">
              {{ `${scope.row.marketing.price_currency} ${scope.row.marketing.large_message.price_number}` }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="最低价" align="center" sortable width="90" prop="goods_min_price">
        <template slot-scope="scope">
          <span>{{ scope.row.price_currency }} {{ scope.row.goods_min_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最高价" align="center" sortable width="90" prop="goods_max_price">
        <template slot-scope="scope">
          <span v-if="Number(scope.row.goods_max_price)">{{ scope.row.price_currency }} {{ scope.row.goods_max_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="刊登日期"
        align="center"
        prop="_publish_date"
        sortable
        width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.publish_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺" align="center" width="280">
        <template slot-scope="scope">
          <ui-tip :content="scope.row.store_content" :url="scope.row.store_url" :is-link="true"/>
          <span
            v-loading="scope.row.isShopTrackLoading"
            class="link"
            style="cursor:pointer"
            element-loading-text="拼命加载中"
            @click="shop_track(scope),handleClick(scope)"
          >{{ scope.row.is_store_track ? ">>我的店铺跟踪" : "跟踪" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="info.currentPage"
        :page-sizes="[100, 200, 400, 600]"
        :page-size="info.pageSize"
        :total="table.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<style lang="scss">
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
    height: 45px;
    display: flex;
    align-items: center;
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
import { ebay_us_goods_track, ebay_us_store_track } from '@/api/ebay-keywords'
export default {
  components: {
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default,
    poTable: require('./po-table').default
  },
  props: {
    table: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    tableLoading: {
      type: Boolean,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    isShow: {
      type: true,
      required: true
    }
  },
  data() {
    return {
      isHighLight: true
    }
  },
  computed: {
    // tables() {
    //   return this.table;
    // },
    // 默认排序
    reTable() {
      return this.table
    }
  },
  mounted() {
  },
  methods: {
    change_status(index, name) {
      this.$set(this.table[index], name, !this.table['name'])
    },
    // 如果没有color/size 就只显示一个属性
    filter_attribute(row, th, index) {
      if (row.length && (!row[0].color || !row[0].size.length)) {
        return ['属性1', `${th}`]
      } else {
        return ['属性1', '属性2', `${th}`]
      }
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
        this.table = this.reTable.tableDate
      }
    },
    handleSizeChange(val) {
      this.info.pageSize = val
    //   this.$emit('search',true)
    },
    handleCurrentChange(val) {
      this.info.currentPage = val
    //   this.$emit('search',true)
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    // 设置颜色
    selectedHighlight({ row, rowIndex }) {
      for (let i = 0; i <= this.table.length - 1; i++) {
        if (
        // this.table[this.tables.colorArr[i]].clickIndex === rowIndex
          this.table[i].clickIndex === rowIndex
        ) {
          if (row.is_store_track && row.is_goods_track) {
            return {
              'background-color': '#FCF7D9'
            }
          }
          if (row.is_goods_track) {
            return {
              'background-color': '#E6F7F6'
            }
          }
          if (row.is_store_track) {
            return {
              'background-color': '#DDEFFD'
            }
          }
        }
      }
    },
    // 点击换颜色
    handleClick(scope) {
      this.$set(this.table[scope.$index], 'clickIndex', scope.$index)
    },
    // 商品跟踪
    good_track(scope) {
      const data = {
        start_track_time: new Date().getTime(),
        recently_track_time: new Date().getTime(),
        ...scope.row
      }
      if (this.table[scope.$index].is_goods_track) {
        this.$emit('router_push_listing')
      } else {
        this.$set(this.table[scope.$index], 'isGoodTrackLoading', true)
        ebay_us_goods_track(data)
          .then(res => {
            this.$set(this.table[scope.$index], 'isGoodTrackLoading', false)
            if (res.status) {
              this.$message({ type: 'success', message: res.message })
              this.$set(this.table[scope.$index], 'is_goods_track', 1)
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(() => {
            this.$message.error('请求服务器出错')
          })
      }
    },
    // 店铺跟踪
    shop_track(scope) {
      const data = {
        store_name: scope.row.store_name,
        goods_item: scope.row.goods_item,
        store_url: scope.row.store_url
      }
      if (this.table[scope.$index].is_store_track) {
        this.$emit('router_push_shop')
      } else {
        this.$set(this.table[scope.$index], 'isShopTrackLoading', true)
        ebay_us_store_track(data)
          .then(res => {
            this.$set(this.table[scope.$index], 'isShopTrackLoading', false)
            if (res.status) {
              this.$message({ type: 'success', message: res.message })
              this.$set(this.table[scope.$index], 'is_store_track', 1)
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
