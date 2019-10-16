<template>
  <div class="c-data-table" >
    <template v-for="(item,index) in content.tables" >
      <div v-show="item.tableShow" :key="index" class="page">
        <p>{{ `关键字:${content.keyword}` }}</p>
        <p>{{ `类目:${content.classify}` }}</p>
        <p>{{ item.searchNum }}</p>
        <ui-table :head="heads" :key="`${item}${index}`">
          <tbody>
            <template v-for="(good, number) in item.table">
              <tr :key="number">
                <th v-for="(head, num) in heads" :key="`${head}${num}`" :width="head_width(head.width)">{{ head.label }}</th>
              </tr>
              <tr :key="`sss${good}${number}`" :class="[good.is_track_goods ? activeClass : '' ]" >
                <td>
                  <p class="center">{{ item.searchNum|capitalize(number) }}</p>
                  <P v-loading="good.isTrackLoading" class="center link cursor" @click="track(good,index,number)">{{ good.is_track_goods? '>>我的跟踪': "跟踪" }}</P>
                </td>
                <td>
                  <!-- height="160px" -->
                  <!-- height="80px" -->
                  <!-- <el-popover placement="right" trigger="hover">
                                <img :src="good.img_url" width="280px">
                                <span slot="reference" class="block center">
                                    <img
                                        v-lazy="good.img_url"
                                        :key="good.img_url"
                                        width="100px"
                                        style="border:none"
                                        >
                                </span>
                            </el-popover> -->
                  <el-popover placement="right" trigger="hover">
                    <!-- <div class="img-cell" :style="{backgroundImage: `url(${content.tables[index].table[number].img_url})`,}"></div> -->
                    <img
                      v-lazy="good.img_url"
                      :key="good.img_url"
                      width="300px">
                    <span slot="reference" class="block center">
                      <div v-if="good.img_url" :style="{backgroundImage: `url(${content.tables[index].table[number].img_url})`,}" class="img-cell"/>
                    </span>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="hover" placement="top">
                    <show-details :content="good.title" />
                    <div slot="reference" class="name-wrapper">
                      <ui-tip :content="good.title" :url="good.goods_url" :is-link="true" :width="300" />
                    </div>
                  </el-popover>
                </td>
                <td>
                  <span class="block center">{{ good.min_price }}</span>
                  <span class="block center">-</span>
                  <span class="block center">{{ good.max_price }}</span>
                </td>
                <td><ui-tip :content="good.grade ? good.grade.split(' ')[0]: ''" /></td>
                <td><ui-tip :content="good.review_number" is-null="-" /></td>
                <td><span class="center block">{{ good.is_best ? '是' :'否' }}</span></td>
                <td><ui-tip :content="good.asin" /></td>
                <td><ui-tip :content="good.inventory" /></td>
                <td class="center">
                  <el-button
                    v-loading="good.detailLoading"
                    type="primary"
                    size="mini"
                    element-loading-text="拼命加载中"
                    @click.native="load(index,number,good.goods_url,good.asin)">
                    {{ good.load?'收起':'加载' }}
                </el-button></td>
              </tr>
              <tr v-if="good.isOpen" :key="`load${number}`">
                <td colspan="9" class="offset">
                  <ui-table :head="detailHeades" :is-th="isTh" class="load-table">
                    <!-- <table v-if="good.isOpen" border="1" cellspacing="0" cellpadding="0" class="load-table"> -->
                    <!-- <tr :key="`${good}${number}11`" id="test">
							<th v-for="(n, v) in detailHeades" :key="v">{{n.label}}</th>
						</tr> -->
                    <tr v-for="(p,i) in good.tablesDetail" :width="head_width(p.width)" :class="[good.is_track_goods ? activeClass : '' ]" :key="`load${i}${number}`" >
                      <td>
                        <el-popover v-if="p.BSR.main_bsr" trigger="hover" placement="top">
                          <show-list :content="p.BSR"/>
                          <div slot="reference" class="name-wrapper">
                            <ui-tip :content="`#${p.BSR.main_bsr_value}  ${p.BSR.main_bsr}`" :width="300"/>
                            <ui-tip v-for="(item, i) in filter_num(p.BSR.other_bsr)" :key="`${i}`" :content="`#${item.value}  ${item.type}`" :width="300"/>
                          </div>
                        </el-popover>
                        <span v-else class="block center">--</span>
                      </td>
                      <td><span class="center block">{{ p.is_FBA ? '是' :'否' }}</span></td>
                      <td><ui-tip :content="p.seller_number"/></td>
                      <td><span class="center block">{{ p.putaway_date| filter_date }}</span></td>
                      <td><ui-tip :content="p.QA"/></td>
                      <td><ui-tip :content="p.fasin"/></td>
                      <td>
                        <el-popover v-if="p.selling_message.length" trigger="hover" placement="top">
                          <show-list :list="p.selling_message" />
                          <div slot="reference" class="name-wrapper center">
                            <!-- <ui-tip class="block" v-for="(c,d) in p.selling_message" :key="`${c}${d}`" :content="c" :width="150"></ui-tip> -->
                            <ui-tip v-for="(item,i) in filter_num(p.selling_message)" :key="`${i}${item}`" :content="item" :width="300"/>
                            <span v-if="p.selling_message.length >1" >...</span>
                          </div>
                        </el-popover>
                      </td>
                      <td>
                        <el-popover trigger="hover" placement="top">
                          <show-list v-if="p.promotion_information.length" :list="p.promotion_information" />
                          <div slot="reference" class="name-wrapper">
                            <ui-tip :content="p.promotion_information" :width="300"/>
                          </div>
                        </el-popover>
                      </td>
                      <td><ui-tip :content="p.variantNumber"/></td>
                    </tr>
                    <!-- </table> -->
                  </ui-table>
                </td>
              </tr>
            </template>
          </tbody>
        </ui-table>
        <p
          v-loading="item.isLoadMore"
          v-show="content.is_last_page ? !content.is_last_page : !item.iscurrentpage"
          :class="{color:item.isLoadMore}"
          element-loading-text="拼命加载中"
          class="link center last"
          @click="load_more(index)">
          {{ item.is_last_page? '没有更多数据了': '加载更多' }}
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.c-data-table {
    width: 100%;
	padding-left: 20px;
	// .img-cell {
	// 	height: 100px;
	// 	width:200px;
	// 	img {
	// 		height: 100%;
	// 		width: 100%
	// 	}
	// }
    .img-cell {
        width: 150px;
        height: 100px;
        background-repeat:  no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .img-cell-big {
        // transform: scale(1.5,1.5)
        width: 400px;
        height: 200px;
        background-repeat:  no-repeat;
        background-position: center center;
        background-size: contain;
    }
	.color {
		color: #333;
    }
    .offset {
        transform: translateX(103px);
    }
}
    .el-loading-spinner {
        top: 80px !important;
    }
    td .el-loading-spinner {
        top: 50% !important;
    }
    p .el-loading-spinner {
        top: 50% !important;
    }
.bg-color {
    background-color: #E6F7F6;
}
</style>

<script>
import { get_amazon_us_goods_details, amazon_us_goods, add_amazon_us_user_track_list } from '@/api/amazon-key-word'
export default {
  components: {
    uiTable: require('@/components/ui-table').default,
    uiTip: require('@/components/ui-tip').default,
    showDetails: require('@/components/show-details').default,
    showList: require('@/components/show-list').default
  },
  filters: {
    // 前端计算序号
    capitalize(searchNum, number) {
      const val = searchNum.split('-')[0]
      return ~~val + number
    },
    filter_date(value) {
      let temDate
      if (value.length > 1) {
        temDate = new Date(value).toLocaleDateString().replace(/\//g, '-')
        return temDate
      } else {
        return '--'
      }
    },
    // 根据产品显示3行
    filter_num(value) {
      return value.slice(0, 3)
    }
  },
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      heads: [
        { label: '排序', width: 100 },
        { label: '图片', width: 150 },
        { label: '标题', width: 300 },
        { label: '现价', width: 150 },
        { label: '评分', width: 150 },
        { label: 'review', width: 150 },
        { label: 'bestSeller', width: 150 },
        { label: 'ASIN', width: 150 },
        { label: '库存预警数', width: 150 },
        { label: '详情加载', width: 150 }
      ],
      detailHeades: [
        { label: 'BSR排名', width: 300 },
        { label: '是否FBA', width: 210 },
        { label: '卖家数量', width: 190 },
        { label: '首次上架日期', width: 300 },
        { label: 'Q&A', width: 50 },
        { label: '父ASIN', width: 100 },
        { label: '卖点信息', width: 300 },
        { label: '促销信息', width: 300 },
        { label: '变体', width: 100 }
      ],
      last: false,
      activeClass: 'bg-color',
      isTh: true
    }
  },
  methods: {
    // handleClick(index,number) {
    //     this.$set(this.content.tables[index].table[number], "is_track_goods", 1);
    // },
    // 加载详情
    load(index, number, url, asin) {
      // load 控制文字变化
      // detailLoading 加载动画
      // tablesDetail 加载详情数组
      // isOpen 数组是否显示
      this.$set(this.content.tables[index].table[number], 'load', !this.content.tables[index].table[number].load)
      const data = {
        // goods_url: url,
        asin
      }
      if (this.content.tables[index].table[number].load && !this.content.tables[index].table[number].isload) {
        this.$set(this.content.tables[index].table[number], 'detailLoading', true)
        get_amazon_us_goods_details(data).then(res => {
          if (!res.status) {
            this.$message.error(res.message)
            this.$set(this.content.tables[index].table[number], 'detailLoading', false)
            this.$set(this.content.tables[index].table[number], 'load', !this.content.tables[index].table[number].load)
          } else {
            this.$set(this.content.tables[index].table[number], 'isload', 1)
            this.$set(this.content.tables[index].table[number], 'isOpen', !this.content.tables[index].table[number].isOpen)
            this.$set(this.content.tables[index].table[number], 'tablesDetail', res.data)
            this.$set(this.content.tables[index].table[number], 'detailLoading', false)
          }
        }).catch(() => {
          this.$set(this.content.tables[index].table[number], 'detailLoading', false)
          this.$message.error('请求服务器错误')
        })
      } else {
        this.$set(this.content.tables[index].table[number], 'detailLoading', false)
        this.$set(this.content.tables[index].table[number], 'isOpen', !this.content.tables[index].table[number].isOpen)
      }
    },
    // 加载更多(下一页)
    load_more(index) {
      // isLoadMore  加载deflag
      this.$set(this.content.tables[index], 'isLoadMore', true)
      this.content.pageSize++
      const data = {
        pageSize: this.content.pageSize,
        type: this.content.keyword,
        category: this.content.category
      }
      amazon_us_goods(data).then(res => {
        this.$set(this.content.tables[index], 'isLoadMore', false)
        if (!res.status) {
          this.$message.error(res.message)
          this.content.pageSize -= 1
          return
        }
        if (res.data.length === 0) {
          this.content.pageSize -= 1
          return
        }
        const data = { searchNum: res.pageTtile, tableShow: true, table: res.data }
        this.content.tables.push(data)
        this.content.is_last_page = res.is_last_page
        const arr = []
        this.$set(this.content.tables[index], 'iscurrentpage', true)
        this.$nextTick(() => {
          //  let tem = document.querySelectorAll('.page')[i].offsetTop
          for (let i = 0; i < this.content.tables.length; i++) {
            // 缺少nextTIck
            const tem = document.querySelectorAll('.page')[i].offsetTop
            arr.push(tem)
          }
          const t = document.querySelectorAll('.last')[document.querySelectorAll('.last').length - 1].offsetTop
          arr.push(t)
          this.last = true
          this.$emit('pagination_arr', arr)
        })
      })
        .catch(() => {
          this.content.pageSize--
          this.$message.error('请求服务器错误')
        })
    },
    track(good, index, number) {
      // good.is_track_goods 判断是否跟踪
      // isTrackLoading 跟踪loading
      if (good.is_track_goods) {
        this.$emit('router_push', good.asin)
      } else {
        this.$set(this.content.tables[index].table[number], 'isTrackLoading', true)
        const data = {
          type: this.content.keyword,
          category: this.content.classify,
          start_track_time: new Date().getTime(),
          recently_track_time: new Date().getTime(),
          ...good
        }
        add_amazon_us_user_track_list(data).then(res => {
          this.$set(this.content.tables[index].table[number], 'isTrackLoading', false)
          if (!res.status) {
            this.$message.error(res.message)
            return
          } else if (res.status === 2) {
            // this.$set(this.content.tables[index].table[number],'isTrack',true)
            this.$set(this.content.tables[index].table[number], 'is_track_goods', 1)
            this.$message({
              type: 'success',
              message: res.message
            })
            return
          } else {
            // this.$set(this.content.tables[index].table[number],'isTrack',true)
            this.$set(this.content.tables[index].table[number], 'is_track_goods', 1)
            this.$message({
              type: 'success',
              message: res.message
            })
            return
          }
        }).catch(() => {
          this.$message.error('请求服务器错误')
        })
      }
    },
    head_width(width) {
      return `${width}px`
    },
    filter_num(value) {
      return value.slice(0, 3)
    }
  }
}
</script>
