import { redirect, Form, useNavigation, useActionData } from 'react-router';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import ArticleEditor from 'components/ArticleEditor';
import React, { useState } from 'react';
import type { Route } from './+types/create-article';
import { createSlug } from '../../../lib/slugify';
import { createArticle, uploadImage } from '../../../services/articleService';
import { toast } from 'sonner';

/*
 * *
 * NOTES:
 * inserting --> supabase.from('articles').insert({ title: 'New Title' })
 * deleting --> supabase.from('articles').delete().eq('id', id)
 * updating --> supabase.from('articles').update({ title: 'New Title' }).eq('id', id)
 * fetching/selecting --> supabase.from('articles').select('*').eq('id', id)
 * eq() works on delete, select, update
 * */

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tag = formData.get('tag') as string;
    const featuredImage = formData.get('featuredImage');
    const content = formData.get('content') as string;

    if (!title || !description || !tag || !featuredImage || !content) {
      return {
        error: 'Please fill in all the fields.',
      };
    }

    /** Validate if the featured image is actually a File object and not Empty*/
    //Prevents the undefined value witnessed earlier.
    if (!(featuredImage instanceof File) || featuredImage.size === 0) {
      return {
        error: 'Please upload a valid featured image!',
      };
    }

    /** Upload the image to the storage bucket first */
    const imgUrl = await uploadImage(featuredImage);

    /** Saving to supabase db*/
    await createArticle({
      title,
      description,
      tag,
      image_url: imgUrl,
      author: 'Sam Wachira',
      slug: createSlug(title),
      content: content,
    });

    toast.success('Article created successfully!');
    return redirect('/');
  } catch (err: any) {
    console.error(`Failed to create article: ${err.message}`);
    toast.error(`Failed to create article`);

    return {
      error: `Failed to create article: ${err.message}`,
    };
  }
};

// look for WYSIWYG editors for assisting in formatting articles
const CreateArticle = () => {
  const [editorContent, setEditorContent] = useState('');
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArticleImage(e.target.files[0]);
    }
  };

  return (
    <section className="container">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center">Create Article</h2>

        <Form
          className="max-w-xl p-6 shadow-sm mt-2 space-y-6 mx-auto bg-white rounded-lg"
          method="post"
          encType="multipart/form-data"
        >
          {/*Display error to the user if any occurs*/}
          {actionData?.error && (
            <p className="bg-red-200/50 text-sm text-red-400 border flex gap-2 items-center border-red-100 rounded-md my-2 p-2">
              <ExclamationTriangleIcon className="size-4" />
              {actionData.error}
            </p>
          )}

          {/*  Title */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full mt-1 px-5 text-sm py-2 block rounded-md outline-none border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-sm placeholder:text-gray-400"
              placeholder="Enter title"
            />
          </div>

          {/*  Description */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              rows={2}
              name="description"
              id="description"
              className="w-full mt-1 px-5 py-2 text-sm block rounded-md outline-none border border-gray-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name="featuredImage"
              id="featuredImage"
              className="mt-1 block text-sm shadow-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file-rounded-md file:border-0 hover:file:bg-gray-200 hover:file:text-black file:bg-black file:text-white file:rounded-md file:cursor-pointer file:transition-all file:duration-300 file:ease-in-out"
            />
          </div>

          {/* Tag*/}
          <div>
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="mt-1 block px-4 py-2 text-sm border outline-none border-gray-300 rounded-md focus:ring focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-sm placeholder:text-gray-400"
              placeholder="Type a tag"
            />
          </div>

          {/* Hidden input for the tiptap editor content*/}
          <input type="hidden" name="content" value={editorContent || ''} />

          {/* Content Editor */}
          <div>
            <label htmlFor="content">Content</label>
            <ArticleEditor content="" onChange={handleEditorChange} />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-500 text-sm text-white px-4 py-2 rounded-md hover:bg-violet-700 cursor-pointer transition-all duration-300 ease-in-out disabled:bg-violet-300/50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Article'}
          </button>
        </Form>
      </div>
    </section>
  );
};
export default CreateArticle;
