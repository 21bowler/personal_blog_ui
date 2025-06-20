import {
  PencilIcon,
  Square3Stack3DIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import ArticleCard from './ArticleCard';
import CallToAction from './CTA';
import Footer from './Footer';
import AuthorMeta from './AuthorMeta';

const BlogDetails = () => {
  return (
    <section className="relative container">
      {/*  Container */}
      <div className="pt-4 pb-8">
        {/* Header details meta data */}
        <div>
          <h2 className="font-semibold text-center text-3xl sm:text-5xl">
            The Future of User Centered Design
          </h2>
          <p className="text-gray-600 text-sm text-center sm:text-lg">
            Exploring how empathy and usability are shaping the next generation
            of design systems.
          </p>

          {/* Article Meta-Data */}
          <AuthorMeta justify="justify-center" />

          {/*Image*/}
          <div></div>

          {/*  article message */}
          <div className="article-details">
            <h3 className="">Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisi eget massa a ornare
              massa mauris sapien. Vitae ipsum varius massa a phasellus tellus.
              Nulla gravida sit et turpis. Massa pretium urna ultrices consequat
              dui et venenatis bibendum id. At aenean ullamcorper viverra diam
              vivamus eget eget urna non. Amet et arcu tellus fermentum amet.
              Lectus consequat nisl dui integer blandit.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisi eget massa a ornare
              massa mauris sapien. Vitae ipsum varius massa a phasellus tellus.
              Nulla gravida sit et turpis. Massa pretium urna ultrices consequat
              dui et venenatis bibendum id. At aenean ullamcorper viverra diam
              vivamus eget eget urna non. Amet et arcu tellus fermentum amet.
              Lectus consequat nisl dui integer blandit.
            </p>

            <h4>1. Increased Efficiency and Productivity.</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisi eget massa a ornare
              massa mauris sapien. Vitae ipsum varius massa a phasellus tellus.
              Nulla gravida sit et turpis. Massa pretium urna ultrices consequat
              dui et venenatis bibendum id. At aenean ullamcorper viverra diam
              vivamus eget eget urna non. Amet et arcu tellus fermentum amet.
              Lectus consequat nisl dui integer blandit.
            </p>

            <h4>2. Better User Experience.</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisi eget massa a ornare
              massa mauris sapien. Vitae ipsum varius massa a phasellus tellus.
              Nulla gravida sit et turpis. Massa pretium urna ultrices consequat
              dui et venenatis bibendum id. At aenean ullamcorper viverra diam
            </p>

            <h4>3. Enhanced Data Analysis</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisi eget massa a ornare
              massa mauris sapien. Vitae ipsum varius massa a phasellus tellus.
              Nulla gravida sit et turpis. Massa pretium urna ultrices consequat
              dui et venenatis bibendum id. At aenean ullamcorper viverra diam
              vivamus eget eget urna non. Amet et arcu tellus fermentum amet.
              Lectus consequat nisl dui integer blandit.
            </p>
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
              <ArticleCard
                title="Improved"
                date="2025-04-13"
                description="Leaving it to the Pros"
                author="Jackie Chan"
              />
              <ArticleCard
                title="Updated"
                date="2025-06-10"
                description="It was updated way before last night"
                author="Bruce Lee"
              />
              <ArticleCard
                title="Updated"
                date="2025-06-10"
                description="It was updated way before last night"
                author="Bruce Lee"
              />
            </div>
          </div>
        </div>
      </div>

      {/*  Call To Action */}
      <CallToAction />
      <Footer />
    </section>
  );
};

export default BlogDetails;
