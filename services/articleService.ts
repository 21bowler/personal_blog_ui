import { supabase } from '~/supabase-client';
import { redirect } from 'react-router';

interface ArticleInput {
  title: string;
  description: string;
  tag: string;
  featuredImage: File;
  content: string;
  author: string;
  slug: string;
}

// TODO: ADD Proper Error Handling for each Service

/** Uploading an image to supabase storage */
export const uploadImage = async (file: File): Promise<string | null> => {
  // create unique file path for security
  const fileExt = file.name.split('.').pop();
  const safeFileName = `${file.name.replace(
    /[^a-zA-Z0-9]/g,
    '_',
  )}-${Date.now()}`;
  const filepath = `${safeFileName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('article-images')
    .upload(filepath, file);

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const { data: publicUrl, error: urlError } = await supabase.storage
    .from('article-images')
    .getPublicUrl(filepath);

  //Error handling for public url
  if (urlError) {
    throw new Error(`Error fetching public url: ${urlError.message}`);
  }

  if (!publicUrl) {
    throw new Error('No public url found');
  }

  return publicUrl.publicUrl;
};

/** Creating an article*/
export async function createArticle(article: ArticleInput) {
  console.log('ENTERED SECTION');
  const { error } = await supabase.from('articles').insert(article);

  console.log('ERROR SECTION');
  if (error) {
    console.error(`Error creating article: ${error.message}`);
    return;
  }

  console.log('LAST SECTION SECTION');
  return redirect('/');
}

/** Fetching all articles*/
export async function fetchAllArticles() {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*');

    if (articleError) {
      console.error(`Error fetching articles: ${articleError.message}`);
      return;
    }

    return articleData;
  } catch (e) {
    console.error(e);
  }
}

/** Fetching an article by slug*/
export async function fetchArticleBySlug(slug: string) {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug);

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
  } catch (e) {
    console.error(e);
  }
}

/** Fetching an article by id*/
export async function fetchArticleById(id: number) {
  try {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id);

    if (articleError) {
      console.error(`Error fetching article by id: ${articleError.message}`);
      return;
    }

    return articleData;
  } catch (e) {
    console.error(e);
  }
}
