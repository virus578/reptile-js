const ebay_us = {
  state: {
    table: {
      category: '',
      result: '',
      colorArr: [],
      tableDate: [],
      currentPage: 1,
      pageSize: 100
    },
    form: {
      category: [''],
      keyword: ''
    },
    isLoading: false,
    selectList: []
  },
  mutations: {
    set_ebay_us_table(state, payload) {
      state.table = payload
    },
    set_ebay_us_form(state, payload) {
      state.form = payload
    },
    set_ebay_us_is_loading(state, payload) {
      state.isLoading = payload
    },
    set_ebay_us_select_list(state, payload) {
      state.selectList = payload
    }
  },
  actions: {}
}
export default ebay_us
