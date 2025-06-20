import React from 'react';
import AuthorMeta from './AuthorMeta';
import ActionButton from './ActionBtn';

const EditorsPick = () => {
  return (
    <section className="container">
      <div className="">
        <h3 className="text-3xl font-semibold mt-8">Editor's Pick</h3>
        <hr className="mt-3 text-gray-300" />
        <div className="my-6 flex flex-col items-center gap-4 sm:flex-row">
          <div className="w-full sm:w-100">
            <div className="w-full h-96 rounded-lg bg-gray-400 animate-pulse sm:w-100" />
          </div>
          <div className="editors-pick-content">
            <span>Javascript</span>
            <h4>Minimalism Isn't Dead: Its Just Smarter.</h4>
            <p>
              In this post, I break down how sharing your journey online
              accelerates learning, builds accountability, and connects you with
              a supportive dev community
            </p>
            {/*Author metadata */}
            <AuthorMeta justify="justify-start" />
            <div className="inline-block mt-4 sm:mt-0">
              <ActionButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
