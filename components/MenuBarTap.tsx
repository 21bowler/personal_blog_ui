import {
  H1Icon,
  H2Icon,
  H3Icon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
} from '@heroicons/react/24/solid';
import { Editor } from '@tiptap/react';

export const MenuBarTap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  // icons
  const Options = [
    {
      icons: <H1Icon className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
    },
    {
      icons: <H2Icon className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
    },
    {
      icons: <H3Icon className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
    },
    {
      icons: <BoldIcon className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold') ? 'is-active' : '',
    },
    {
      icons: <ItalicIcon className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic') ? 'is-active' : '',
    },
    {
      icons: <StrikethroughIcon className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike') ? 'is-active' : '',
    },
    {
      icons: 'AL',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    },
    {
      icons: 'AC',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }) ? 'is-active' : '',
    },
    {
      icons: 'AR',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    },
  ];

  return (
    <div className="button-group rounded-md p-1 mb-1 bg-slate-50 space-x-3">
      {Options.map((option, idx) => (
        <button key={idx} onClick={option.onClick} className={option.pressed}>
          {option.icons}
        </button>
      ))}
    </div>
  );
};
