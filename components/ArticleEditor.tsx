import { useEditor, EditorContent } from '@tiptap/react';
import { MenuBarTap } from './MenuBarTap';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';

const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc ml-3',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal ml-3',
      },
    },
  }),
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
    </>
  );
};

export default ArticleEditor;
