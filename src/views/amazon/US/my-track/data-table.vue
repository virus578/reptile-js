<template>
  <div v-loading="tableLoading" class="amazon-following-table" element-loading-text="拼命加载中">
    <el-table
      :data="trackList"
      height="630"
      border
      style="width: 100%">
      <el-table-column
        label="开始跟踪时间"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.start_track_time[0] }}</span>
          <span class="block">{{ scope.row.start_track_time[1] }}</span>
          <!-- <ui-tip :width="100" :content="scope.row.start_track_time" :isDate="isDate" /> -->
          <!-- <span>{{ new Date(scope.row.start_track_time).toLocaleString('chinese',{hour12:false}) }}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="搜索关键词"
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top" transition="fade-in-linear">
            <div
              v-for="(item) in scope.row.key_word"
              :key="`${item.index}${item.created_time}`"
              class="center">
              {{ item.key_word }}
            </div>
            <span
              slot="reference"
              class="name-wrapper">
              {{ scope.row.key_word.length ? scope.row.key_word[0].key_word : '' }}
              <span v-if="scope.row.key_word.length >1" class="block">...</span>
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="图片"
        align="center">
        <template slot-scope="scope">
          <!-- <div class="img-cell">
						<img :src="scope.row.img_url" alt="">
					</div> -->
          <!-- <el-popover placement="right" trigger="hover">
                        <img :src="scope.row.img_url" width="280x" height="160px">
                        <span slot="reference">
                            <img
                            v-lazy="scope.row.img_url"
                            :key="scope.row.img_url"
                            height="60px"
                            width="90px"
                            style="border:none"
                            >
                        </span>
                    </el-popover> -->
          <el-popover placement="right" trigger="hover">
            <!-- <div class="img-cell" :style="{backgroundImage: `url(${content.tables[index].table[number].img_url})`,}"></div> -->
            <img
              v-lazy="scope.row.img_url"
              :key="scope.row.img_url"
              width="300px">
            <span slot="reference" class="block center">
              <div v-if="scope.row.img_url" :style="{backgroundImage: `url(${trackList[scope.$index].img_url})`,}" class="img-cell"/>
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        align="center">
        <template slot-scope="scope">
          <ui-tip :content="scope.row.title" :url="scope.row.goods_url" :is-link="true" />
        </template>
      </el-table-column>
      <el-table-column
        label="现价"
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" transition="fade-in-linear">
            <charst :options="scope.row.price.options" :id="scope.row.price.id" />
            <span slot="reference" class="name-wrapper">{{ `${scope.row.price.min_price}-${scope.row.price.max_price}` }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="评分"
        align="center">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.grade.options" trigger="hover" placement="top">
            <charst :options="scope.row.grade.options" :id="scope.row.grade.id" />
            <span slot="reference" class="name-wrapper">{{ scope.row.grade.title }}</span>
          </el-popover>
          <span v-else>{{ `暂无评分` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="review"
        align="center">
        <template v-if="scope.row.review_number.options" slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <charst :options="scope.row.review_number.options" :id="scope.row.review_number.id" />
            <span slot="reference" class="name-wrapper">{{ scope.row.review_number.title }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="BSR排名"
        width="150"
        align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.main_bsr.title">
            <el-popover trigger="hover" placement="top">
              <charst :options="scope.row.main_bsr.options" :id="scope.row.main_bsr.id" />
              <!-- <span slot="reference" class="name-wrapper">{{scope.row.main_bsr.title}}</span> -->
              <ui-tip slot="reference" :content="scope.row.main_bsr.title" class="name-wrapper" />
            </el-popover>
            <div v-for="(item,index) in scope.row.other_bsr" :key="`${item.title}${item.id}${scope.row.$index}`">
              <el-popover trigger="hover" placement="top">
                <charst :options="item.options" :id="`${index}${item.title}${item.id}${scope.row.$index}`" />
                <!-- <span  slot="reference" class="name-wrapper">{{item.title}}</span> -->
                <ui-tip slot="reference" :content="item.title" class="name-wrapper"/>
              </el-popover>
            </div>
          </div>
          <div v-else class="center">--</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="asin"
        align="center"
        label="ASIN"
      >
        <template slot-scope="scope">
          <ui-tip :content="scope.row.asin" lot="reference" class="name-wrapper"/>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="卖家数量">
        <template v-if="scope.row.seller_number.options" slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <charst :options="scope.row.seller_number.options" :id="scope.row.seller_number.id" />
            <span slot="reference" class="name-wrapper">{{ scope.row.seller_number.title }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="是否FBA"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.is_FBA ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="首次上架日期"
        align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.putaway_date.length">
            <span class="block">{{ scope.row.putaway_date }}</span>
            <!-- <span class="block">{{scope.row.start_track_time[1]}}</span> -->
          </div>
          <div v-if="!scope.row.putaway_date.length">
            <span>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="卖点"
        align="center">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.selling_message.length" trigger="hover" placement="top">
            <show-list :list="scope.row.selling_message" />
            <div slot="reference" class="name-wrapper center">
              <ui-tip :content="scope.row.selling_message[0]" :width="80"/>
              <span v-if="scope.row.selling_message.length > 1" >...</span>
            </div>
          </el-popover>
          <span v-else>{{ `--` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="QA"
        label="Q&A"
        align="center"/>
      <el-table-column
        align="center"
        label="变体">
        <!-- v-if="JSON.stringify(scope.row.variant[0]) !==`{}`" -->
        <template slot-scope="scope">
          <el-popover v-show="test" trigger="hover" placement="top">
            <div class="table-cell">
              <table class="table" border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="(item, index) in heades" :key="`${index}${item}`">{{ item }}</th>
                </tr>
                <tr v-for="(row, index) in scope.row.variant[scope.row.variant.length - 1]" :key="`${index}${row.variant_value}${new Date().getTime()}`">
                  <td>{{ row.variant_type }}</td>
                  <td>{{ row.variant_value }}</td>
                </tr>
              </table>
            </div>
            <div slot="reference" class="name-wrapper">
              <span class="block" @click="is_show(scope.$index,'isVariant')">{{ scope.row.variant_number }}</span>
            </div>
          </el-popover>
          <popover v-model="scope.row.isVariant">
            <template v-for="(item,index) in scope.row.variant" >
              <table :key="`${index}121546`" class="table" border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="(r,i) in heades" :key="`${new Date().getTime()}${r}${i}`">{{ r }}</th>
                </tr>
                <tr v-for="(row,num) in scope.row.variant[scope.row.variant.length - 1]" :key="`${row.variant_value}${num}2`">
                  <td>{{ row.variant_type }}</td>
                  <td>{{ row.variant_value }}</td>
                </tr>
              </table>
            </template>
          </popover>
        </template>
        <!-- <template slot-scope="scope" v-if="JSON.stringify(scope.row.variant[0]) ===`{}`">
                    <span>1</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="promotion_information"
        align="center"
        label="促销信息">
        <template slot-scope="scope">
          <span>{{ scope.row.promotion_information ? scope.row.promotion_information : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺"
        align="center">
        <template slot-scope="scope">
          <ui-tip :content="scope.row.store_name" :url="scope.row.store_url" :is-link="true" />
        </template>
      </el-table-column>
      <el-table-column
        label="最近跟踪时间"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.recently_track_time[0] }}</span>
          <span class="block">{{ scope.row.recently_track_time[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="跟踪者"
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

<style lang="scss" >
.amazon-following-table {
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
		padding: 5px;
		float: right;
	}
	.el-table td, .el-table th {
		border-color: #ebeef5
	}
	// .img-cell {
	// 	width: 200px;
	// 	height: 100px;
	// 	img {
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// }
    .img-cell {
        width: 120px;
        height: 100px;
        background-repeat:  no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .el-table .cell {
        padding: 0;
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
.table-cell {
            max-height: 400px;
            overflow-y: auto
        }
</style>

<script>
export default {
  components: {
    uiTable: require('@/components/ui-table').default,
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default,
    showList: require('@/components/show-list').default,
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
    }
  },
  data() {
    return {
      heades: ['类型', '值'],
      isTh: true,
      test: true,
      isDate: true
    }
  },
  methods: {
    // 控制点击 dialog
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
    }
  }
}
</script>
