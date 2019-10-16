const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  workId: state => state.router.workId,
  visitedViews: state => state.tagsView.visitedViews
//   amazonUSTable: state => state.amzon_us.tables,
  // tables: state => state.amazon_us.tables,
}
export default getters
