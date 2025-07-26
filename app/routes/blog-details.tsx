import React from 'react';
import type { Route } from './+types/blog-details';
import BlogDetails from 'components/BlogDetails';
import { fetchArticleBySlug } from '../../services/articleService';
import {
  createComment,
  getCommentsForArticle,
} from '../../services/comment-service';
import { getCurrentSession } from '../../services/auth-service';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;
  const fetchedArticle = await fetchArticleBySlug(slug);

  const allComments = await getCommentsForArticle(fetchedArticle.id);

  // basic check for validating if the article exists
  if (!fetchedArticle) {
    return {
      error: `Article with slug ${slug} not found.`,
    };
  }

  return {
    author: fetchedArticle.author,
    articleId: fetchedArticle.id,
    title: fetchedArticle.title,
    date: fetchedArticle.created_at,
    description: fetchedArticle.description,
    imgUrl: fetchedArticle.image_url,
    content: fetchedArticle.content,
    tag: fetchedArticle.tag,
    comments: allComments,
  };
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const comment = formData.get('postComment') as string;
  const articleId = formData.get('articleId') as string;
  const session = await getCurrentSession();

  if (!session) {
    return {
      error: 'You must be logged in to comment!',
    };
  }

  const currentUserId = session.user.id;

  if (
    !comment ||
    !articleId ||
    currentUserId === undefined ||
    currentUserId === null ||
    !currentUserId
  ) {
    return {
      error: 'Missing comment content, article ID, or user ID.',
    };
  }

  try {
    const newComment = await createComment(comment, articleId, currentUserId);

    return {
      success: 'Comment posted successfully!',
      newComment: newComment,
    };
  } catch (error: any) {
    console.error('Error creating comment: ', error);

    // return to the UI
    return {
      error: error.message || 'An unexpected error occurred.',
    };
  }
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const {
    author,
    title,
    date,
    content,
    tag,
    imgUrl,
    description,
    articleId,
    comments,
  } = loaderData;

  return (
    <div>
      <BlogDetails
        title={title}
        date={date}
        imgUrl={imgUrl}
        author={author}
        tag={tag}
        description={description}
        content={content}
        articleId={articleId}
        comments={comments}
      />
    </div>
  );
};

export default BlogDetailsPage;
