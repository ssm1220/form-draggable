import { computed, defineComponent, inject } from 'vue'

export default defineComponent(
    (props) => {
        // console.log(props, 'props')
        const config = inject('config')
        console.log(config, 'config')
        const blockStyles = computed(() => {
            return {
                top: `${props.block.top}px`,
                left: `${props.block.left}px`,
                zIndex: `${props.block.zIndex}`
            }
        })
        const render = () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[props.block.key]
            const renderComponent = component.render()
            return (
                <div
                    className="editor-block"
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
