import { defineComponent, ref, computed, inject } from 'vue'
import { EditorBlock } from '@/components/index'
import { useMenuDragger, useFocus, useBlockDragger } from '@/hooks/index'
import './index.scss'
export default defineComponent(
    (props, ctx) => {
        // 拖拽元素生成区域的Ref
        const containerRef = ref(null)
        // 左侧侧边栏的配置项
        const config = inject('config')
        // 定义在data.json的editor相关配置项
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newV) {
                ctx.emit('update:modelValue', newV)
            }
        })
        // 拖拽区域的样式，在data.json配置
        const containerStyles = computed(() => {
            return {
                width: data.value.container.width + 'px',
                height: data.value.container.height + 'px'
            }
        })
        // 1.实现菜单拖拽功能
        const { evDragStart, evDragEnd } = useMenuDragger(data, containerRef)
        // 2.实现获取焦点
        // 清除其他元素的focus
        const { evMouseDownFather, evMouseDownItem, focusData } = useFocus(
            data,
            (e) => {
                // console.log(focusData.value.focusArr,'center--mouseDown')
                evAfterMouseDownItem(e)
            }
        )

        const { evAfterMouseDownItem } = useBlockDragger(focusData)
        // 3.实现拖拽多个元素的功能
        const render = () => {
            return (
                <div className="editor">
                    <div className="editor-left">
                        {/* 根据注册列表渲染对应的内容 可以实现h5的拖拽 */}
                        {config.componentList.map((component) => {
                            return (
                                <div
                                    className="editor-left-item"
                                    draggable
                                    forceFallback={true}
                                    onDragstart={(e) =>
                                        evDragStart(e, component)
                                    }
                                    onDragEnd={(e) => evDragEnd(e)}>
                                    <span>{component.label}</span>
                                    <div>{component.preview()}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="editor-center">
                        <div className="editor-top">菜单栏</div>
                        <div className="editor-container">
                            <div
                                ref={containerRef}
                                onMousedown={evMouseDownFather}
                                className="editor-container-canvas"
                                style={containerStyles.value}>
                                {data.value.blocks.map((block) => {
                                    return (
                                        <EditorBlock
                                            block={block}
                                            onMousedown={(e) =>
                                                evMouseDownItem(e, block)
                                            }></EditorBlock>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="editor-right">属性控制栏目</div>
                </div>
            )
        }
        return render
    },
    {
        props: {
            modelValue: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['update:modelValue']
    }
)
