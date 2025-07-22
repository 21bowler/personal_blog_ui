import {
  Form,
  useNavigation,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import ArticleEditor from '../../../components/ArticleEditor';
import { useEffect, useState } from 'react';
import {
  fetchArticleById,
  updateArticleById,
} from '../../../services/articleService';
import type { Route } from './+types/edit-article';
import { toast } from 'sonner';

export const clientAction = async ({
  params,
  request,
}: Route.ClientActionArgs) => {
  try {
    const articleId = parseInt(params.id);
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tag = formData.get('tag') as string;
    const content = formData.get('content') as string;

    //Validation of the input fields
    if (!title || !description || !tag || !content) {
      return {
        error: 'Please fill in all the fields.',
      };
    }

    /** Update to supabase db */
    await updateArticleById(articleId, title, description, tag, content);

    toast.success('Article updated successfully!');
    return redirect('/admin/all-articles');
  } catch (e: any) {
    console.error(`Failed to update article: ${e.message}`);

    toast.error(`Failed to update article`);
    return {
      error: `Failed to update article: ${e.message}`,
    };
  }
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const articleId = parseInt(params.id);
  const specificArticle = await fetchArticleById(articleId);

  // basic check for validating if the article exists
  if (!specificArticle) {
    return {
      error: `Article with ID ${articleId} not found.`,
    };
  }

  return {
    title: specificArticle.title,
    description: specificArticle.description,
    tag: specificArticle.tag,
    content: specificArticle.content,
  };
};

const EditArticle = ({ loaderData }: Route.ComponentProps) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  const { title, description, tag, content } = loaderData;

  // states
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formTag, setFormTag] = useState(tag);
  const [formContent, setFormContent] = useState(content);

  useEffect(() => {
    setFormTitle(title);
    setFormDescription(description);
    setFormTag(tag);
    setFormContent(content);
  }, [title, description, tag, content]);

  // content change handler
  const handleContentChange = (content: string) => {
    setFormContent(content);
  };

  // @ts-ignore
  return (
    <section className="container">
      <h2 className="text-center my-2.5 text-2xl font-semibold tracking-wide">
        <span className="bg-gradient-from-tl bg-gradient-to-br from-blue-200 to-bg-blue-700">
          Edit
        </span>{' '}
        Article
      </h2>

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
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
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
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
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
            value={formTag}
            onChange={(e) => setFormTag(e.target.value)}
          />
        </div>

        {/* Hidden input for the tiptap editor content*/}
        <input type="hidden" name="content" value={formContent} />

        {/* Content Editor */}
        <div>
          <label htmlFor="content">Content</label>
          <ArticleEditor content={formContent} onChange={handleContentChange} />
        </div>
        <div className="flex gap-4">
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-500 text-sm text-white px-4 py-2 rounded-md hover:bg-violet-700 cursor-pointer transition-all duration-300 ease-in disabled:bg-violet-300/50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Article'}
          </button>
          <button
            type={'button'}
            onClick={() => navigate('/admin/all-articles')}
            className="bg-gray-400 text-white text-sm px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-500 ease-in duration-300"
          >
            Cancel
          </button>
        </div>
      </Form>
    </section>
  );
};
export default EditArticle;
