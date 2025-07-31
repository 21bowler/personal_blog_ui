import { supabase } from '~/supabase-client';

interface ArticleInput {
  title: string;
  description: string;
  tag: string;
  image_url: string | null;
  content: string;
  author: string;
  slug: string;
}

// TODO: ADD Proper Error Handling for each Service

/** Uploading an image to supabase storage */
export const uploadImage = async (file: File): Promise<string | null> => {
  // TODO: Proper row level policy to be implemented before PRODUCTION.
  if (!file) {
    throw new Error('No file selected');
  }

  try {
    //safely get file extension
    const fileName = file.name || '';

    // create a unique file path for security
    const fileExt = fileName.split('.').pop() || 'jpg';
    const baseFileName = fileName
      .split('.')[0]
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 50);

    const filepath = `${baseFileName}_${Date.now()}.${fileExt}`;
    // const filepath = `${file.name}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filepath, file);

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const { data: publicUrl } = supabase.storage
      .from('article-images')
      .getPublicUrl(filepath);

    // if no public url found, throw error.
    if (!publicUrl) {
      throw new Error('No public url found');
    }

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Upload image error: ', error);
    throw new Error(
      `Failed to upload image: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
};

/** Creating an article*/
export async function createArticle(article: ArticleInput) {
  const { error } = await supabase.from('articles').insert(article);

  if (error) {
    console.error(`Error creating article: ${error.message}`);
    // Rethrowing error for the UI
    throw new Error(`Error creating article: ${error.message}`);
  }
}

/** Fetching all articles*/
export async function fetchAllArticles() {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*');

    if (articleError) {
      console.error('Supabase fetchAllArticles error:', articleError.message);
      // Re-throw an error to be called by the loader function when using it.
      throw new Error(`Failed to fetch articles: ${articleError.message}`);
    }

    // return data on success.
    return articleData;
  } catch (error) {
    console.error('Unexpected error in fetchAllArticles:', error);
    //Re-throw
    throw error;
  }
}

/** Fetching an article by slug*/
export async function fetchArticleBySlug(slug: string) {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (articleError) {
      console.error(
        `Supabase fetchArticleBySlug Error: ${articleError.message}`,
      );
      throw new Error(
        `Failed to fetch article by slug "${slug}": ${articleError.message}`,
      );
    }

    if (!articleData) {
      return null;
    }

    return articleData;
  } catch (error) {
    console.error('Unexpected error in fetchArticleBySlug:', error);
    throw error;
  }
}

/** Fetching an article by id*/
export async function fetchArticleById(id: number) {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (articleError) {
      console.error(
        `Failed to fetch article by id --> ${id}: ${articleError.message}`,
      );
      throw new Error(`Error fetching article by id: ${articleError.message}`);
    }

    if (!articleData) {
      return null;
    }

    return articleData;
  } catch (e) {
    console.error('Unexpected error in fetchArticleById:', e);
    throw e;
  }
}

export async function updateArticleById(
  id: number,
  title: string,
  description: string,
  tag: string,
  content: string,
): Promise<void> {
  try {
    const { error: updateError } = await supabase
      .from('articles')
      .update({
        title: title,
        description: description,
        tag: tag,
        content: content,
      })
      .eq('id', id);

    if (updateError) {
      console.error(`Error updating article by id: ${updateError.message}`);
      throw new Error(`Error updating article by id: ${updateError.message}`);
    }
  } catch (error: any) {
    console.error('Unexpected Error in updateArticleById: ', error);
    throw error;
  }
}

// Total Articles
export async function fetchTotalArticles() {
  const { count, error: countError } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching total articles: ', countError.message);
    throw new Error('Error fetching total articles.');
  }

  return count;
}

// fetching the latest 5 articles
export async function fetchLatestArticles() {
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (articlesError) {
    console.error('Error fetching latest 5 articles: ', articlesError.message);
    throw new Error('Failed to fetch the latest 5 articles.');
  }

  return articles;
}
