let pathItem = JSON.parse(localStorage.getItem('pathItem'))
let path = JSON.parse(localStorage.getItem('path'))
export default{
  namespaced: true,
  state: {
    pathItem: pathItem, // [{name: 'xxx',query: {id:1}}] 面包屑数组
    path: path // [xxx,xxx,xxx] 路径数组
  },
  mutations: {
    setPath (state, data) {
      state.pathItem = data.pathItem
      state.path = data.newPath
      localStorage.setItem('pathItem', JSON.stringify(data.pathItem))
      localStorage.setItem('path', JSON.stringify(data.newPath))
    }
  },
  actions: {

  }
}
