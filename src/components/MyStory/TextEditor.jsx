// <path-to-your-build>/src/ckeditor.ts or file containing editor configuration if you are integrating an editor from source.

// The editor creator to use.
import '../../css/ckeditor.css';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import EmojiPicker from './EmojiPicker';
import ImgaeLoader from './ImageLoader';
const TextEditor = ({ setPicturesUrl, picturesUrl, setData, data }) => {
  const editorConfiguration = {
    // plugins: [...SpecialCharacters, SpecialCharactersEmoji],
    // 이모지 렌더링을 위해 contentRenderer를 사용
    contentRenderer: (view, model, writer) => {
      if (model.isText()) {
        // 텍스트 노드인 경우에만 처리
        writer.setAttribute('data-emoji', true, model);
      }
    },
    // Enter: {
    //   shouldCreateNewParagraph: false, //흠...
    // },
    toolbar: {
      items: [
        'undo',
        'redo',
        // '|',
        'heading',
        'fontFamily',
        'fontSize',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'bulletedList',
        'numberedList',
        'alignment',
        '|',
        // 'imageUpload',
        'blockQuote',
        // 'mediaEmbed',
        'link',
        // 'specialCharacters',
      ],
    },
    language: 'ko',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          view: 'p',
          title: '본문',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: '제목',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: '부제목',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: '소제목',
          class: 'ck-heading_heading4',
        },
      ],
    },
    placeholder: '이곳에 내용을 작성해 주세요',
  };

  return (
    <div style={{ width: '100%' }}>
      <CKEditor
        id="ckeditor"
        editor={Editor}
        config={editorConfiguration}
        data={data}
        onChange={async (event, editor) => {
          try {
            await setData(editor.getData()); // 에디터 작성 내용 저장
            console.log(data);
          } catch (error) {
            console.log('이모지 테스트', error.response.data);
          }
        }}
      />
      <ImgaeLoader setData={setData} setPicturesUrl={setPicturesUrl} />
      <EmojiPicker setData={setData} data={data} className="이모티콘" />
    </div>
  );
};

export default TextEditor;
