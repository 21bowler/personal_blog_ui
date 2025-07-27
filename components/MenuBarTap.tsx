import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Minus,
  List,
  ListOrdered,
  Link,
  Highlighter,
  TextQuote,
} from 'lucide-react';
import type { Editor } from '@tiptap/react';

export const MenuBarTap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  // icons
  const Options = [
    {
      icons: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
    },
    {
      icons: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
    },
    {
      icons: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
    },
    {
      icons: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold') ? 'is-active' : '',
    },
    {
      icons: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic') ? 'is-active' : '',
    },
    {
      icons: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike') ? 'is-active' : '',
    },
    {
      icons: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    },
    {
      icons: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }) ? 'is-active' : '',
    },
    {
      icons: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    },
    {
      icons: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList') ? 'is-active' : '',
    },
    {
      icons: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList') ? 'is-active' : '',
    },
    {
      icons: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight') ? 'is-active' : '',
    },
    {
      icons: <Minus className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: editor.isActive('horizontalRule') ? 'is-active' : '',
    },
    {
      icons: <TextQuote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive('blockquote') ? 'is-active' : '',
    },
    {
      icons: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.isActive('undo') ? 'is-active' : '',
    },
    {
      icons: <Redo className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.isActive('redo') ? 'is-active' : '',
    },
  ];

  return (
    <div className="button-group rounded-md p-1 mb-1 bg-slate-50 space-x-3">
      {Options.map((option, idx) => (
        <button
          key={idx}
          onClick={option.onClick}
          type="button"
          className={option.pressed}
        >
          {option.icons}
        </button>
      ))}
    </div>
  );
};
