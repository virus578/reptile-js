import { amazon_us_goods } from '@/api/amazon-key-word'
import { Message } from 'element-ui'
const amazon_us = {
  state: {
    tables: {},
    isShow: false,
    tableLoading: false,
    form: {
      category: 'search-alias=aps',
      type: ''
    }
  },
  mutations: {
    set_amazon_us_table(state, payload) {
      state.tables = payload
    },
    set_amazon_us_is_show(state, payload) {
      state.isShow = payload
    },
    set_amazon_us_table_loading(state, payload) {
      state.tableLoading = payload
    },
    set_amazon_us_form(state, payload) {
      state.form = payload
    }
  },
  actions: {
    async get_amazon_us_table({ commit }, payload) {
      await amazon_us_goods(payload.data).then(res => {
        const content = {
          keyword: '',
          classify: '',
          category: '',
          pageSize: 0,
          tables: [
            {
              searchNum: '',
              table: []
            }
          ]
        }
        commit('set_amazon_us_is_show', true)
        commit('set_amazon_us_table_loading', false)
        if (!res.status) {
          Message.error(res.message)
        } else {
          // 请求回来的table转换数据格式
          content.keyword = res.searchContent
          content.category = res.category
          payload.list.map((item, index) => {
            if (item.value === res.category) {
              content.classify = item.label
              return
            }
          })
          content.is_last_page = res.is_last_page
          content.tables[0].searchNum = res.pageTtile
          content.tables[0].table = res.data
          if (content.tables[0].table.length) {
            content.tables[0].tableShow = true
          }
          commit('set_amazon_us_table', content)
        }
      })
        .catch(() => {
          commit('set_amazon_us_table_loading', false)
          Message.error('请求服务器错误')
        })
    }
  }
}
export default amazon_us
