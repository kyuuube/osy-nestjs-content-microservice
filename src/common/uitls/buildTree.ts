/* tslint:disable */
export const buildTree = (list: any[]) => {
    const temp = {}
    const tree = {}
    for (let i in list) {
        temp[list[i].id] = list[i]
    }
    for (let i in temp) {
        if (temp[i].parentId) {
            if (!temp[temp[i].parentId].children) {
                temp[temp[i].parentId].children = new Object()
            }
            temp[temp[i].parentId].children[temp[i].id] = temp[i]
        } else {
            tree[temp[i].id] = temp[i]
        }
    }
    return tree
}

export const buildTreeList = (source: any) => {
    let cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
    return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' //给父级添加一个children属性，并赋值
        return father.parentId == null //返回第一层
    })
}
