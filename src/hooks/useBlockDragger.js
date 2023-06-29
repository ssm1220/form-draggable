export function useBlockDragger(focusData) {
    let dragState = {
        startX: 0,
        startY: 0
    }
    const evAfterMouseDownItem = (e) => {
        console.log(e, 'e')
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
        // 此时拿到的是点击item的位置坐标，因此如果是多选的话，我们需要用该item的最终坐标位置 - 开始位置，来得到每个选中item应该移动的距离
        dragState = {
            ...dragState,
            startX: e.clientX,
            startY: e.clientY,
            startFocusData: focusData.value.focusArr.map(
                ({ top, left }) => ({
                    top,
                    left
                })
            )
        }
    }
    const mouseMove = (e) => {
        const { clientX, clientY } = e
        const distanceX = clientX - dragState.startX
        const distanceY = clientY - dragState.startY
        console.log(distanceX, 'distanceX')
        console.log(dragState.startFocusData, 'startFocusData')
        focusData.value.focusArr.forEach((item, index) => {
            item.left = dragState.startFocusData[index].left + distanceX
            item.top = dragState.startFocusData[index].top + distanceY
        })
    }
    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
    }
    return {
        evAfterMouseDownItem
    }
}