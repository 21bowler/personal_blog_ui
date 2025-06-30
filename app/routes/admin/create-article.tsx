import React from 'react';

// look for WYSIWYG editors for assisting in formatting articles
const CreateArticle = () => {
  return (
    <section className="container">
      <div className="border-2 p-4">
        <h2 className="text-2xl font-semibold text-center">Create Article</h2>

        <form className="max-w-lg p-6 space-y-6 mx-auto bg-white">
          {/*  Title */}
          <div>
            <label className="text-gray-700 px-2">Title</label>
            <input
              type="text"
              className="w-full mt-1 px-5 py-2 block rounded-full outline-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-gray-400"
              placeholder="Enter title"
            />
          </div>

          {/*  Description */}
          <div>
            <label className="text-gray-700 px-2 font-medium">
              Description
            </label>
            <textarea className="w-full mt-1 px-5 py-2 block rounded-md outline-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>

          {/*    Featured Image */}
          <div>
            <label> Featured Image</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block text-sm shadow-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file-rounded-md file:border-0 hover:file:bg-gray-200 hover:file:text-black file:bg-black file:text-white file:rounded-md file:cursor-pointer file:transition-all file:duration-300 file:ease-in-out"
            />
          </div>

          {/*    Content Editor */}

          {/*    Submit button */}
          <button
            type="submit"
            className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-700 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Publish Article
          </button>
        </form>
      </div>
    </section>
  );
};
export default CreateArticle;
