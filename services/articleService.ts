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
      console.error(`Error fetching article by slug: ${articleError.message}`);
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
