import { supabase } from '~/supabase-client';

// Create a new comment
export const createComment = async (
  content: string,
  articleId: string,
  sessionId: string,
) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .insert({ user_id: sessionId, content, article_id: articleId })
    .select();

  if (error) {
    console.error('Error creating comment', error.message);
    throw error;
  }

  return comments;
};

// Update a comment
export const updateComment = async (commentId: number, content: string) => {
  const { error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .select();

  if (error) {
    console.error('Error updating comment', error.message);
    throw error;
  }
};

// delete a comment (ADMIN FEATURE ONLY)
export const deleteComment = async (commentId: number) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment', error.message);
    throw error;
  }
};

//Get comments for an article with user profile info (Gets all comments)
export const getCommentsForArticle = async (articleId: string) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select(
      'id, user_id, content, created_at, updated_at, profiles(username, avatar_url)',
    )
    .eq('article_id', articleId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments for article: ', error.message);
    throw error;
  }

  return comments;
};
