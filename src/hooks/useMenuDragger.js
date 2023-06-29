export function useMenuDragger(data, containerRef) {
    let currentComponent = null
    const evDragStart = (e, component) => {
        /* 
            dragenter 进入元素中 添加一个移动标识
            dragover 在目标元素经过 必须要阻止默认行为 否则不能出发drop
            dragleave 离开元素的时候 需要增加一个禁用标识
            drop 松手的时候 根据拖拽的组件 添加一个组件
        */
        // 当前拖拽元素
        currentComponent = component
        // e 左侧item拖拽事件
        console.log(e, 'evDragStart----event', component)
        console.log(containerRef.value, 'containerRef')
        // 监听containerRef(拖拽放置区域) 拖拽事件
        containerRef.value.addEventListener('dragenter', evDragEnter)
        containerRef.value.addEventListener('dragover', evDragOver)
        containerRef.value.addEventListener('dragleave', evDragLeave)
        containerRef.value.addEventListener('drop', evDrop)
    }
    // 此时左侧item的拖拽事件结束，应停止监听
    const evDragEnd = (e) => {
        containerRef.value.removeEventListener('dragenter', evDragEnter)
        containerRef.value.removeEventListener('dragover', evDragOver)
        containerRef.value.removeEventListener('dragleave', evDragLeave)
        containerRef.value.removeEventListener('drop', evDrop)
    }
    // 此时放置容器监听到有拖拽元素进入
    const evDragEnter = (e) => {
        console.log(e, 'evDragEnter')
        e.dataTransfer.dropEffect = 'move'
    }
    // 此时放置容器监听到有拖拽元素经过
    const evDragOver = (e) => {
        // 必须要阻止默认行为 否则不能触发drop
        e.preventDefault()
        // console.log(e, 'evDragOver')
    }
    // 此时放置容器监听到有拖拽元素离开
    const evDragLeave = (e) => {
        console.log(e, 'evDragLeave')
        e.dataTransfer.dropEffect = 'none'
    }
    // 此时放置容器监听到有拖拽元素松手
    const evDrop = (e) => {
        console.log(currentComponent, 'currentComponent')
        console.log(e, 'evDrop')
        let blocks = data.value.blocks
        // data为定义在data.json的数据 由home引入并由ref包裹，通过props传递给editor组件
        data.value.blocks = [
            ...blocks,
            {
                top: e.offsetY,
                left: e.offsetX,
                zIndex: 1,
                key: currentComponent.key,
                alignCenter: true //希望松手的时候可以居中
            }
        ]
        currentComponent = null
    }
    return {
        evDragStart,
        evDragEnd
    }
}