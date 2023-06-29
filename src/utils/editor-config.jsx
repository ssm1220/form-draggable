// 列表区可以显示所有的物料
// key对应的组件映射关系
import { ElButton, ElInput } from 'element-plus'

/* 
    该函数用来生成一个注册左侧侧边栏可拖拽item的实例对象
        该对象包含：
            componentList：用来遍历生成侧边栏item的数组
            componentMap：在拖拽生成区域中的item由data.json的blocks生成，此时我们只能获得block(组件位置信息，组件key), 我们要知道是生成哪个组件就需要检测componentMap是否存在block.key对应的组件，存在则调用 componentMap[key].render() 来生成对应的组件
*/
function createEditorConfig() {
    const componentList = []
    const componentMap = {}
    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component)
            componentMap[component.key] = component
        }
    }
}

export let registerConfig = createEditorConfig()
console.log(registerConfig, 'registerConfig')
registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: 'text'
})
registerConfig.register({
    label: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
    key: 'button'
})
registerConfig.register({
    label: '输入框',
    preview: () => <ElInput placeholder="预览"></ElInput>,
    render: () => <ElInput placeholder="渲染"></ElInput>,
    key: 'input'
})
