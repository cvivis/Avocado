// 에디터 사용
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
// 컬러피커 플러그인
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// 한국어 설정
import '@toast-ui/editor/dist/i18n/ko-kr';

function EditorBox() {

    return (
        <div className="edit_wrap">
            <Editor
                initialValue=" "
                placeholder="물품 설명을 입력해주세요"
                previewStyle="vertical"
                height="600px"
                // 처음 언어설정 (위지윅 or 마크다운)
                initialEditType="wysiwyg"
                // 한 가자 타입 or 두 가지 타입
                hideModeSwitch={true}
                useCommandShortcut={false}
                // 컬러 피커 플러그인
                plugins={[colorSyntax]}
                // 언어 설정
                language="ko-KR"
            />
        </div>
    );
}

export default EditorBox;