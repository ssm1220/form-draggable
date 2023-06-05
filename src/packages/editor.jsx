import { defineComponent, ref, computed, inject } from 'vue'
import EditorBlock from './editorBlock'
import './editor.scss'
export default defineComponent(
    (props) => {
        let currentComponent = null
        const containerRef = ref(null)
        const config = inject('config')
        const data = computed({
            get() {
                return props.modelValue
            }
        })
        const containerStyles = computed(() => {
            return {
                width: data.value.container.width + 'px',
                height: data.value.container.height + 'px'
            }
        })
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
        const evDragEnter = (e) => {
            console.log(e, 'evDragEnter')
            e.dataTransfer.dropEffect = 'move'
        }
        const evDragOver = (e) => {
            e.preventDefault()
            console.log(e, 'evDragOver')
        }
        const evDragLeave = (e) => {
            console.log(e, 'evDragLeave')
            e.dataTransfer.dropEffect = 'none'
        }
        // 松手
        const evDrop = (e) => {
            console.log(currentComponent,'currentComponent')
            console.log(e, 'evDrop')
            currentComponent = null
        }
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
                                    }>
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
                                className="editor-container-canvas"
                                style={containerStyles.value}>
                                {data.value.blocks.map((block) => {
                                    return (
                                        <EditorBlock
                                            block={block}></EditorBlock>
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
        }
    }
)
