import { computed } from "vue"
export function useFocus(data,callback) {
    // 选中和非选中的项
    const focusData = computed(() => {
        let focusArr = []
        let unFocusArr = []
        data.value.blocks.forEach((block) =>
            (block.focus ? focusArr : unFocusArr).push(block)
        )
        return {
            focusArr,
            unFocusArr
        }
    })
    const evClearFocus = () => {
        data.value.blocks.forEach((block) => (block.focus = false))
    }
    const evMouseDownFather = (e) => {
        evClearFocus()
    }
    const evMouseDownItem = (e, block) => {
        // console.log(e, 'e', block, 'block')
        e.preventDefault()
        e.stopPropagation()
        // 按住shift则不清除其他元素的focus
        !e.shiftKey && evClearFocus()
        block.focus = !block.focus
        // 鼠标按下后的回调函数
        callback(e)
    }

    return {
        evMouseDownItem,
        evMouseDownFather,
        focusData
    }
}