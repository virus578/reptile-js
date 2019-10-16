<template>
  <div v-loading="tableLoading" class="c-data-table" element-loading-text="拼命加载中">
    <el-table
      :data="trackList"
      height="660"
      border
      style="width: 100%">
      <el-table-column
        label="开始跟踪时间"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.start_track_date }}</span>
          <span class="block">{{ scope.row.start_track_hour }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="店铺名"
        align="center">
        <template slot-scope="scope">
          <ui-tip
            :content="scope.row.store_name"
            :url="scope.row.store_url"
            :is-link="true"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="feedBack总量"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top">
            <charst
              :options="scope.row.feedback.options"
              :id="scope.row.feedback.id"
            />
            <span slot="reference" class="name-wrapper">{{ scope.row.feedback.title }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="好评率"
        show-overflow-tooltip
        prop="grade"
        align="center"/>
      <el-table-column
        label="浏览量"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top">
            <charst
              :options="scope.row.view.options"
              :id="scope.row.view.id" />
            <span slot="reference" class="name-wrapper">{{ scope.row.view.title }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="收藏量"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <charst
              :options="scope.row.follower.options"
              :id="scope.row.follower.id" />
            <span slot="reference" class="name-wrapper">{{ scope.row.follower.title }}</span>

          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="评分"
        show-overflow-tooltip
        prop="feedback_score"
        align="center"/>
      <el-table-column
        label="上新信息"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.new_goods_lists.today_new_goods_title" trigger="hover" placement="top">
            <ui-tip
              slot="reference"
              :content="scope.row.new_goods_lists.today_new_goods_title"
              :url="scope.row.new_goods_lists.today_new_goods_url"
              :is-link="true"
              class="name-wrapper" />
          </el-popover>
          <span>{{ scope.row.new_goods_lists.today_new_goods_number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最后更新时间"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <span class="block">{{ scope.row.recently_track_date }}</span>
          <span class="block">{{ scope.row.recently_track_hour }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="job_number"
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
    border-color: rgb(128, 128, 128);
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
		border-color: #ebeef5
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

export default {
  components: {
    uiTable: require('@/components/ui-table').default,
    uiTip: require('@/components/ui-tip').default,
    charst: require('@/components/charst').default,
    showList: require('@/components/show-list').default
  },
  props: {
    trackList: {
      type: Array,
      required: true
    },
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
    click() {
      this.test = false
    },
    mouseenter() {
      const date1 = new Date().getTime()
      setTimeout(() => {
        const date2 = new Date().getTime()
        if (date2 >= date1 + 3000) {
          this.test = true
        }
      }, 3000)
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
