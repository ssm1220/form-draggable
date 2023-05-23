import { defineComponent, ref, defineProps } from 'vue';
import './editor.scss';
export default defineComponent(
  (props) => {
    console.log(props, 'props');
    const render = () => {
      return (
        <div className="editor">
          <div className="editor-left">左侧物料区</div>
          <div className="editor-center">
            <div className="editor-top">菜单栏</div>
            <div className="editor-container">
              <div className="editor-container-canvas">1</div>
            </div>
          </div>
          <div className="editor-right">属性控制栏目</div>
        </div>
      );
    };
    return render;
  },
  {
    props: {
      jsonData: {
        type: Object,
        default: () => ({}),
      },
    },
  }
);
