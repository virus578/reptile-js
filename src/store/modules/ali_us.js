const ali_us = {
  state: {
    tableData: {
      info: {
        category: '',
        result: '',
        currentPage: 1,
        pageSize: 50
      },
      table: []
    },
    form: {
      category: ['0'], // '0'
      keyword: '',
      type: 'default'
    },
    isLoading: false,
    selectList: []
  },
  mutations: {
    set_ali_us_table(state, payload) {
      state.tableData = payload
    },
    set_ali_us_form(state, payload) {
      state.form = payload
    },
    set_ali_us_is_loading(state, payload) {
      state.isLoading = payload
    },
    set_ali_us_select_list(state, payload) {
      state.selectList = payload
    },
    set_ali_us_table_color(state, payload) {
      state.tableData.table[payload.index][payload.name] = 1
    }
  }
  // actions: {
  //     get_ali_us_table({commit},payload){
  //         commit('set_ali_us_table', payload)
  //     }
  // }
}
export default ali_us
