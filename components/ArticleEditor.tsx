import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from '@tiptap/react';
import { MenuBarTap } from './MenuBarTap';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';

const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];
// const content = '<p>Hello World!</p>';

const ArticleEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          'border outline-none border-gray-200 bg-slate-100 rounded-md min-h-[200px] py-2 px-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <>
      <MenuBarTap editor={editor} />
      <EditorContent editor={editor} />
      {/*<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>*/}
      {/*<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>*/}
    </>
  );
};

export default ArticleEditor;
