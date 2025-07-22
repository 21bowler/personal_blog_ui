import { supabase } from '~/supabase-client';

// Create a new comment
const createComment = async (content: string, articleId: string) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .insert([{ content, article_id: articleId }])
    .select();

  if (error) {
    console.error('Error creating comment', error.message);
    throw error;
  }

  return comments;
};
