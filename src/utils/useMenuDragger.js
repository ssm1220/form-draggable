export function useMenuDragger(data, containerRef) {
    let currentComponent = null
    const evDragStart = (e, component) => {
        /* 
            dragenter 进入元素中 添加一个移动标识
            dragover 在目标元素经过 必须要阻止默认行为 否则不能出发drop
            dragleave 离开元素的时候 需要增加一个禁用标识
            drop 松手的时候 根据拖拽的组件 添加一个组件
        */
        currentComponent = component
        console.log(e, 'evDragStart', component)
        console.log(containerRef.value, 'containerRef')
        containerRef.value.addEventListener('dragenter', evDragEnter)
        containerRef.value.addEventListener('dragover', evDragOver)
        containerRef.value.addEventListener('dragleave', evDragLeave)
        containerRef.value.addEventListener('drop', evDrop)
    }
    const evDragEnd = (e) => {
        containerRef.value.removeEventListener('dragenter', evDragEnter)
        containerRef.value.removeEventListener('dragover', evDragOver)
        containerRef.value.removeEventListener('dragleave', evDragLeave)
        containerRef.value.removeEventListener('drop', evDrop)
    }
    const evDragEnter = (e) => {
        console.log(e, 'evDragEnter')
        // e.dataTransfer.dropEffect = 'move'
    }
    const evDragOver = (e) => {
        e.preventDefault()
        // console.log(e, 'evDragOver')
    }
    const evDragLeave = (e) => {
        console.log(e, 'evDragLeave')
        e.dataTransfer.dropEffect = 'none'
    }
    // 松手
    const evDrop = (e) => {
        console.log(currentComponent, 'currentComponent')
        console.log(e, 'evDrop')
        let blocks = data.value.blocks
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