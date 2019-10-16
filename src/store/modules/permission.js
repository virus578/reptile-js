const permission = {
  state: {
    rank: -1
  },
  mutations: {
    judge_rank(state, rank) {
      state.rank = rank
    }
  }
}

export default permission
