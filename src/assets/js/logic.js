/*
  角色权限排序
*/
export const roleAuthsSort = (auths, roleAuths) => {
  let relist = []
  auths.forEach(e => {
    e.level = 1
    e.isSelect = false
    if (e.items) {
      e.items.forEach((i, idx) => {
        i.level = 2
        i.parant = e
        i.isSelect = false
        if (i.items) {
          i.items.forEach(j => {
            j.level = 3
            j.isSelect = false
            if (roleAuths && roleAuths.includes(j.name)) {
              j.isSelect = true
              i.isSelect = true
              e.isSelect = true
            }
          })
        }
        if (e.items.length > 1) {
          if (idx === 0) {
            i.childsLength = e.items.length
          } else {
            i.childsLength = 0
          }
        }
        relist.push(i)
      })
    } else {
      relist.push(e)
    }
  })
  return relist
}

/*
  角色权限表格规则
*/
export const authsTableMerge = ({ row, column, rowIndex, columnIndex }) => {
  if (row.level === 2) {
    if (row.childsLength !== undefined && columnIndex === 0) return [row.childsLength, 1]
  }
}

/*
  角色权限复选框规则
*/
export const roleAuthsCheckBoxSelect = (data, list) => {
  let level = data.level
  let status = data.isSelect
  if (status && level === 1) {
    list.forEach(ele => {
      if (ele.parent_name === data.name) {
        ele.isSelect = true
        if (ele.items) ele.items.forEach(e => { e.isSelect = true })
      }
    })
  } else if (!status && level === 1) {
    list.forEach(ele => {
      if (ele.parent_name === data.name) {
        ele.isSelect = false
        if (ele.items) ele.items.forEach(e => { e.isSelect = false })
      }
    })
  } else if (status && level === 2) {
    data.parant.isSelect = true
    if (data.items) data.items.forEach(e => { e.isSelect = true })
  } else if (!status && level === 2) {
    if (data.items) data.items.forEach(e => { e.isSelect = false })
    let selectNumber = 0
    list.forEach(ele => {
      if (ele.parent_name === data.parent_name && ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) data.parant.isSelect = false
  } else if (status && level === 3) {
    list.forEach(ele => {
      if (ele.name === data.parent_name) {
        ele.isSelect = true
        ele.parant.isSelect = true
      }
    })
  } else if (!status && level === 3) {
    let selectNumber = 0
    let idx = list.map(ele => ele.name).indexOf(data.parent_name)
    let item = list[idx]
    item.items.forEach(ele => {
      if (ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) item.isSelect = false
    selectNumber = 0
    list.forEach(ele => {
      if (ele.parent_name === item.parent_name && ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) item.parant.isSelect = false
  }
}

/*
  角色权限提取已选的ID出来
*/
export const roleAuthsFormatId = list => {
  let result = []
  list.forEach(ele => {
    // if (ele.isSelect &&) {
    //   result.push(ele.name)
    //   if (ele.parant && !result.includes(ele.parant.name)) result.push(ele.parant.name)
    // }
    if (ele.items) {
      ele.items.forEach(e => {
        if (e.isSelect) result.push(e.name)
      })
    }
  })
  return result
}

// 获取当前日凌晨时间
export const getTodayDateObj = () => new Date(new Date().toLocaleDateString())
/*
  日期选择 禁用选择当前日之前的日期 （包括当天）
*/
export const disabledBeforeDateIncludesToday = {
  disabledDate (time) {
    return time.getTime() < getTodayDateObj().getTime()
  }
}
/*
  日期选择 禁用选择当前日之前的日期
*/
export const disabledBeforeDate = {
  disabledDate (time) {
    return time.getTime() < Date.now()
  }
}
