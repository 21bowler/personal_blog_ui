import { X } from 'lucide-react';

interface DeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePopup = ({ onConfirm, onCancel }: DeletePopupProps) => {
  return (
    <div className="relative z-50 bg-card w-full max-w-screen border shadow-md sm:rounded-lg md:w-full sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5">
      <div className="flex flex-col text-center gap-1.5 px-4 py-4 sm:text-left md:px-5 border-b">
        <h2 className="text-base leading-none font-normal">
          Confirm to delete user
        </h2>
      </div>
      <div className="py-4 px-4 md:px-5 overflow-hidden">
        <p className="text-sm text-center text-muted-foreground">
          This is permanent! Are you sure you want to delete the user?
        </p>
      </div>
      <div className="w-full h-px bg-muted-foreground/20" />
      {/*  cancel and confirm buttons*/}
      <div className="flex gap-2 px-5 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="relative cursor-pointer bg-muted-foreground/40 space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visble:outline-4 border border-muted-foreground/50 text-foreground w-full flex items-center justify-center text-sm px-4 py-2 h-[38px]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="relative cursor-pointer bg-destructive/65 space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visble:outline-4 border border-destructive/80 text-accent w-full flex items-center justify-center text-sm px-4 py-2 h-[38px] truncate"
        >
          Delete
        </button>
      </div>

      {/* Close Button */}
      <button
        type="button"
        className="absolute right-4 top-4 rounded-sm opacity-20 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DeletePopup;
