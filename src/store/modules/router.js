const router = {
  state: {
    workId: ''
  },
  mutations: {
    set_work_id(state, workId) {
      state.workId = workId
    }
  }
}
export default router
