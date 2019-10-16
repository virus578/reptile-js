<template>
  <div v-loading="tableLoading" class="c-data-table" element-loading-text="拼命加载中" @update:colorArr="$emit('input',colorArr)" >
    <el-table
      :data="trackList"
      :row-style="selectedHighlight"
      :highlight-current-row="isHighLight"
      height="660"
      border
      style="width: 100%"
      row-key="id">
      <el-table-column
        label="开始跟踪时间"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.start_track_time[0] }}</span>
          <span class="block">{{ scope.row.start_track_time[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="图片"
        align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <!-- :src="scope.row.goods_img"  -->
            <img
              v-lazy="scope.row.goods_img"
              :key="scope.row.goods_img"
              width="200px"
              height="200px" >
            <span slot="reference">
              <!-- :src="scope.row.goods_img" -->
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
          <span class="block">{{ scope.row.goods_category[0] }}</span>
          <span class="block">{{ `>${scope.row.goods_category[1]}` }}</span>
          <span class="block">{{ `>${scope.row.goods_category[2]}` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="关键字"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top" transition="fade-in-linear">
            <div
              v-for="(item) in scope.row.goods_keyword"
              :key="`${item.index}${item.created_time}`"
              class="center">
              {{ item.key_word }}
            </div>
            <span
              slot="reference"
              class="name-wrapper">
              {{ scope.row.goods_keyword.length ? scope.row.goods_keyword[scope.row.goods_keyword.length -1].key_word : '' }}
            </span>
            <span v-if="scope.row.goods_keyword.length >1">...</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="近7天销量"
        align="center"
        width="90">
        <template v-if="scope.row.marketing.small_message.sale_number" slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear"
          >
            <charst
              v-if="scope.row.marketing.small_message.numberOptions"
              :options="scope.row.marketing.small_message.numberOptions"
              :id="scope.row.marketing.small_message.id" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'smallSaleDialog')">
              {{ scope.row.marketing.small_message.sale_number }}
            </span>
          </el-popover>
          <popover
            v-if="scope.row.marketing.small_message.numberVariantOptions"
            v-model="scope.row.smallSaleDialog">
            <charst
              :options="scope.row.marketing.small_message.numberVariantOptions"
              :id="scope.row.marketing.small_message.id1" />
          </popover>
          <span class="orange block">{{ scope.row.marketing.small_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="近15天销量"
        align="center"
        width="90">
        <template v-if="scope.row.marketing.middle_message.sale_number" slot-scope="scope">
          <el-popover
            v-if="scope.row.marketing.middle_message.sale_number"
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              v-if="scope.row.marketing.middle_message.numberOptions"
              :options="scope.row.marketing.middle_message.numberOptions"
              :id="scope.row.marketing.middle_message.id" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'middleSaleDialog')">
              {{ scope.row.marketing.middle_message.sale_number }}</span>
          </el-popover>
          <popover
            v-if="scope.row.marketing.middle_message.numberVariantOptions"
            v-model="scope.row.middleSaleDialog">
            <charst
              :options="scope.row.marketing.middle_message.numberVariantOptions"
              :id="scope.row.marketing.small_message.id1" />
          </popover>
          <span class="orange block">{{ scope.row.marketing.middle_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="近30天销量"
        align="center"
        width="90">
        <template v-if="scope.row.marketing.large_message.sale_number" slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              v-if="scope.row.marketing.large_message.numberOptions"
              :options="scope.row.marketing.large_message.numberOptions"
              :id="scope.row.marketing.large_message.id" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'bigSaleDialog')">
              {{ scope.row.marketing.large_message.sale_number }}
            </span>
          </el-popover>
          <popover
            v-if="scope.row.marketing.large_message.numberVariantOptions"
            v-model="scope.row.bigSaleDialog">
            <charst
              :options="scope.row.marketing.large_message.numberVariantOptions"
              :id="scope.row.marketing.small_message.id1" />
          </popover>
          <span class="orange block">{{ scope.row.marketing.large_message.hint_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="近7天销售额"
        prop="fifiteenSaleNum.value"
        align="center"
        width="100">
        <template v-if="scope.row.marketing.small_message.price_number" slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              v-if="scope.row.marketing.small_message.priceOptions"
              :options="scope.row.marketing.small_message.priceOptions"
              :id="scope.row.marketing.small_message.id1" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'smallPriceDialog')">
              {{ scope.row.marketing.small_message.price_number }}
            </span>
          </el-popover>
          <popover
            v-if="scope.row.marketing.small_message.priceVariantOptions"
            v-model="scope.row.smallPriceDialog">
            <charst
              :options="scope.row.marketing.small_message.priceVariantOptions"
              :id="`9${scope.row.marketing.small_message.id1}`" />
          </popover>
        </template>
      </el-table-column>
      <el-table-column
        label="近15天销售额"
        align="center"
        width="100">
        <template v-if="scope.row.marketing.middle_message.price_number" slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              v-if="scope.row.marketing.middle_message.priceOptions"
              :options="scope.row.marketing.middle_message.priceOptions"
              :id="scope.row.marketing.middle_message.id1" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'middlePriceDialog')">
              {{ scope.row.marketing.middle_message.price_number }}
            </span>
          </el-popover>
          <popover
            v-if="scope.row.marketing.middle_message.priceVariantOptions"
            v-model="scope.row.middlePriceDialog">
            <charst
              :options="scope.row.marketing.middle_message.priceVariantOptions"
              :id="`8${scope.row.marketing.small_message.id1}`" />
          </popover>
        </template>
      </el-table-column>
      <el-table-column
        label="近30天销售额"
        prop="fifiteenSaleNum.value"
        align="center"
        width="100">
        <template v-if="scope.row.marketing.large_message.price_number" slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            transition="fade-in-linear">
            <charst
              v-if="scope.row.marketing.large_message.priceOptions"
              :options="scope.row.marketing.large_message.priceOptions"
              :id="`31${scope.row.marketing.large_message.id1}`" />
            <span
              slot="reference"
              class="name-wrapper"
              @click="is_show(scope.$index,'bigPriceDialog')">
              {{ scope.row.marketing.large_message.price_number }}
            </span>
          </el-popover>
          <popover v-model="scope.row.bigPriceDialog">
            <charst
              v-if="scope.row.marketing.large_message.priceVariantOptions"
              :options="scope.row.marketing.large_message.priceVariantOptions"
              :id="`7${scope.row.marketing.small_message.id1}`" />
          </popover>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        prop="fifiteenSaleNum.value"
        align="center"
        width="90">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom" transition="fade-in-linear">
            <charst
              v-if="scope.row.price.options"
              :options="scope.row.price.options"
              :id="scope.row.price.id" />
            <div slot="reference" class="name-wrapper">
              <!-- <span>{{scope.row.price.max_price}}</span> -->
              <!-- <span class="block">-</span> -->
              <span>{{ `${scope.row.price.max_price}-${scope.row.price.min_price}` }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="publish_date"
        width="90"
        label="刊登日期"
        align="center"/>
      <el-table-column
        width="120"
        label="店铺"
        align="center">
        <template slot-scope="scope">
          <ui-tip
            :content="scope.row.store_content"
            :url="scope.row.store_url"
            :is-link="true" />
          <span
            v-loading="scope.row.isShopTrackLoading"
            class="link"
            style="cursor:pointer"
            element-loading-text="拼命加载中"
            @click="shop_track(scope),handleClick(scope)" >
            {{ scope.row.is_store_track ? ">>我的店铺跟踪" : "跟踪" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="最后更新时间"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.recently_track_time[0] }}</span>
          <span class="block">{{ scope.row.recently_track_time[1] }}</span>
        </template>
      </el-table-column>
      <!-- prop="user_name" -->
      <el-table-column
        prop="job_number"
        width="90"
        label="跟踪工号"
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
import { ebay_us_store_track } from '@/api/ebay-keywords'
export default {
  components: {
    uiTable: require('@/components/ui-table').default,
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default,
    popover: require('@/components/popover').default
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
    },
    value: {}
  },
  data() {
    return {
      heades: ['类型', '值'],
      isTh: true,
      isDate: true,
      arr: [],
      isHighLight: true
    }
  },
  methods: {
    // el-popover 只能实现hover 用dioloag实现点击
    is_show(index, params) {
      this.$set(this.trackList[index], params, true)
    },
    handle_size_change(val) {
      this.paginate.pageSize = val
      this.$emit('search', true)
    },
    handle_current_change(val) {
      this.paginate.page = val
      this.$emit('search', true)
    },
    shop_track(scope) {
      const data = {
        store_name: scope.row.store_name,
        goods_item: scope.row.goods_item,
        store_url: scope.row.store_url
      }
      if (scope.row.is_store_track) {
        this.$emit('router_push_shop')
      } else {
        this.$set(this.trackList[scope.$index], 'isShopTrackLoading', true)
        ebay_us_store_track(data).then(res => {
          this.$set(this.trackList[scope.$index], 'isShopTrackLoading', false)
          if (res.status) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$set(this.trackList[scope.$index], 'is_store_track', true)
          } else {
            this.$message.error(res.message)
          }
        }).catch(() => { this.$message.error('请求服务器出错') })
      }
    },
    selectedHighlight({ row, rowIndex }) {
      for (let i = 0; i <= this.trackList.length - 1; i++) {
        if (this.trackList[i].clickIndex === rowIndex) {
          if (row.is_store_track) {
            return {
              'background-color': '#DDEFFD'
            }
          }
        }
      }
    },
    handleClick(scope) {
      this.value.push(scope.$index)
      this.$set(this.trackList[scope.$index], 'clickIndex', scope.$index)
    }
  }
}
</script>
