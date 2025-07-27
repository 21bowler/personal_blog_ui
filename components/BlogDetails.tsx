import {
  PencilIcon,
  Square3Stack3DIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import AuthorMeta from './AuthorMeta';

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
}) => {
  return (
    <section className="relative container">
      {/*  Container */}
      <div className="pt-4 pb-8">
        {/* Header details meta data */}
        <div>
          <h2 className="font-semibold text-center text-3xl sm:text-5xl">
            {title}
          </h2>
          <p className="text-gray-600 text-sm text-center sm:text-lg">
            {description}
          </p>

          {/* Article Meta-Data */}
          <AuthorMeta justify="justify-center" />

          {/*Image*/}
          <div></div>

          {/*  article message */}
          <div className="article-details">
            <div dangerouslySetInnerHTML={{ __html: content }} />
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
