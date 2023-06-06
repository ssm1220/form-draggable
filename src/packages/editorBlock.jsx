import { computed, defineComponent, inject, onMounted, ref } from 'vue'

export default defineComponent(
    (props) => {
        // console.log(props, 'props')
        const config = inject('config')
        console.log(config, 'config')
        const blockStyles = computed(() => {
            return {
                position: 'absolute',
                top: `${props.block.top}px`,
                left: `${props.block.left}px`,
                zIndex: `${props.block.zIndex}`
            }
        })
        const blockRef = ref(null)
        onMounted(() => {
            console.log(blockRef.value, 'blockRef')
            const { offsetWidth, offsetHeight } = blockRef.value
            // 说明是拖拽放手的时候渲染的，其他默认渲染到页面上的内容不需要剧中
            if (props.block.alignCenter) {
                props.block.left = props.block.left - offsetWidth / 2
                props.block.top = props.block.top - offsetHeight / 2
                props.block.alignCenter = false
            }
        })
        const render = () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[props.block.key]
            const renderComponent = component.render()
            return (
                <div
                    className={`editor-block ${props.block.focus ? 'editor-block-focus' : ''}`}
                    ref={blockRef}
                    style={blockStyles.value}>
                    {renderComponent}
                </div>
            )
        }
        return render
    },
    {
        props: {
            block: {
                type: Object,
                default: {}
            }
        }
    }
)
