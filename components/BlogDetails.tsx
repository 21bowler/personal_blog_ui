import {
  PencilIcon,
  Square3Stack3DIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import AuthorMeta from './AuthorMeta';
import { formatIntl, formatTimeAgo } from '../lib/utility';

type ArticleDetailsProps = {
  title: string;
  date: string;
  imgUrl: string;
  author: string;
  tag: string;
  description: string;
  content: string;
  articleId: string;
  comments: any;
};

const BlogDetails = ({
  title,
  date,
  imgUrl,
  author,
  tag,
  description,
  content,
  articleId,
  comments,
}: ArticleDetailsProps) => {
  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const commentContent = formData.get('comment') as string;

    try {
      const session = await getCurrentSession();
      if (!session) throw new Error('You must be logged in to comment!');

      const sessionId = session.user.id;
      await createComment(commentContent, articleId, sessionId);

      // clear form
      // e.currentTarget.reset();
      toast.success('Comment created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to create comment:', error);
      toast.error('Failed to create comment!');
    }
  };

  return (
    <section className="relative container">
      {/*  Container */}
      <div className="pt-4 pb-8">
        {/* Header details meta data */}
        <div>
          <h2 className="font-semibold text-balanced text-center leading-tight text-3xl sm:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm text-center sm:text-xl">
            {description}
          </p>

          {/* Article Meta-Data */}
          <AuthorMeta
            justify="justify-center"
            author={author}
            tag={tag}
            posted={formatIntl(date)}
          />

          {/*Article Image*/}
          <div className="mb-4">
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/*  article content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Comments 4</h3>

            <div>
              <form>
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full p-2 text-sm border border-muted-foreground rounded-md text-gray-600"
                  placeholder="share your thoughts..."
                />
                <button
                  type="button"
                  className="bg-muted-foreground text-sm text-muted px-4 py-2 rounded-lg cursor-pointer mt-1"
                >
                  Post Comment
                </button>
              </form>
            </div>

            {/* Comment List */}
            <div className="space-y-6 mt-3">
              {comments.map((comment) => (
                <div key={comment.user_id} className="flex gap-4">
                  <div>
                    <img
                      src={comment.profiles.avatar_url}
                      alt={comment.username}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        {comment.profiles.username}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Article Cards*/}
          <div className="my-4">
            <div className="flex mb-4 items-center justify-between">
              <h4 className="text-xl font-semibold">Latest Articles</h4>
              <div className="flex">
                <ArrowLeftIcon className="size-5 text-gray-500" />
                <ArrowRightIcon className="size-5" />
              </div>
            </div>

            {/*  Article Cards */}
            {/* Should be  */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/*<ArticleCard*/}
              {/*  title="Improved"*/}
              {/*  date="2025-04-13"*/}
              {/*  description="Leaving it to the Pros"*/}
              {/*  author="Jackie Chan"*/}
              {/*/>*/}
              {/*<ArticleCard*/}
              {/*  title="Updated"*/}
              {/*  date="2025-06-10"*/}
              {/*  description="It was updated way before last night"*/}
              {/*  author="Bruce Lee"*/}
              {/*/>*/}
              {/*<ArticleCard*/}
              {/*  title="Updated"*/}
              {/*  date="2025-06-10"*/}
              {/*  description="It was updated way before last night"*/}
              {/*  author="Bruce Lee"*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
