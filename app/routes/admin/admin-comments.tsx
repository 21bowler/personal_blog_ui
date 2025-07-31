import {
  Edit,
  ExternalLink,
  MoreHorizontal,
  Search,
  Trash2,
} from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getAllComments } from '../../../services/comment-service';
import { formatIntl } from '../../../lib/utility';
import { Link } from 'react-router';

interface Comment {
  articles: {
    title: string;
    slug: string;
  };
  content: string;
  created_at: string;
  id: number;
  profiles: {
    username: string;
  };
}

// Create a separate action menu component to handle Speed.
const ActionMenu = memo(
  ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => {
    return (
      <div className="absolute right-18 z-50 min-w-[8rem] border border-gray-200 overflow-hidden bg-popover shaddow-md rounded-md shadow-md p-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex px-2 py-1.5 items-center w-full hover:bg-gray-100 gap-1"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-destructive px-2 py-1.5 flex items-center w-full hover:bg-gray-100 gap-1"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </button>
      </div>
    );
  },
);

const AdminComments = () => {
  const [actionDropDownId, setActionDropDownId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // memoize toggle handler
  const handleDropdownToggle = useCallback((commentId: number) => {
    setActionDropDownId((prev) => (prev === commentId ? null : commentId));
  }, []);

  //  memoized delete comment handler
  const handleCommentDelete = useCallback((commentId: number) => {
    console.log(`Comment with ${commentId} deleted`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActionDropDownId(null);
      }
    };

    if (actionDropDownId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [actionDropDownId]);

  useEffect(() => {
    getAllComments()
      .then((allComments) => {
        setComments(allComments);
        console.log('Checking comments: ', allComments);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6 mt-3">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
        <p className="text-muted-foreground">
          Manage User Comments on your articles
        </p>
      </div>

      <div className="border border-gray-300 rounded-lg p-6 ">
        {/* header */}
        <div className="my-4">
          <h2 className="text-xl font-medium">Comment Management</h2>
          <p className="text-sm text-muted-foreground">
            Review, edit, or delete comments from users
          </p>
        </div>

        {/*  Content */}
        <div>
          <div className="flex gap-4 mb-6">
            <div className="relative w-full">
              <Search className="size-4 absolute h-full inset-y-0 left-2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search comments, articles or users"
                className="pr-4 pl-8 py-2 rounded-md border border-gray-400 outline-none w-full bg-transparent text-sm text-muted-foreground focus:outline-1 focus:offset-2 focus:border-gray-500"
              />
            </div>
          </div>

          {/* Table container - holding user comments */}
          <div className="border overflow-auto w-full relative border-gray-300 p-4 rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="t-row text-muted-foreground font-light">
                  <th className="t-head w-[200px]">User</th>
                  <th className="t-head hidden md:table-cell">Article</th>
                  <th className="t-head">Comment</th>
                  <th className="t-head hidden md:table-cell w-[150px]">
                    Date
                  </th>
                  <th className="t-head w-[100px]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-24 text-center">
                      No comments found!
                    </td>
                  </tr>
                ) : (
                  comments.map((comment) => (
                    <tr key={comment.id} className="t-row">
                      <td className="t-data">
                        <div className="font-medium">
                          {comment.profiles.username}
                        </div>
                        <div className="text-xs text-muted-foreground md:hidden">
                          {formatIntl(comment.created_at)}
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        <Link
                          to={`/article/${comment.articles.slug}`}
                          className="flex text-muted-foreground items-center gap-1 hover:underline"
                        >
                          {comment.articles.title}
                          <ExternalLink className="size-3" />
                        </Link>
                      </td>
                      <td className="t-data">
                        <div className="line-clamp-2">{comment.content}</div>
                      </td>
                      <td className="hidden md:table-cell text-xs text-muted-foreground">
                        {formatIntl(comment.created_at)}
                      </td>
                      <td className="t-data relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActionDropDownId(
                              actionDropDownId === comment.id
                                ? null
                                : comment.id,
                            )
                          }
                          className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                        {/*Action buttons*/}
                        {actionDropDownId === comment.id && (
                          <ActionMenu
                            onEdit={() => console.log('Edit has ben clicked!!')}
                            onDelete={() => handleCommentDelete(comment.id)}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminComments;
