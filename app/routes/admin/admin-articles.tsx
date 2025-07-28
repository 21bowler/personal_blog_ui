import React from 'react';
import { Link } from 'react-router';
import { fetchAllArticles } from '../../../services/articleService';
import type { Route } from './+types/admin-articles';

export const loader = async () => {
  const allArticles = await fetchAllArticles();

  return allArticles.map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description,
  }));
};

const AdminArticles = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div className={'container'}>
      {/*header*/}
      <div className="flex justify-between items-center py-4">
        <h1 className="uppercase font-serif">All articles</h1>
        <Link
          to="/admin/create-article"
          className="text-sm text-white px-2.5 py-1 bg-burnham-700 rounded-lg"
        >
          New Article
        </Link>
      </div>

      {/* All articles*/}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {loaderData.map(({ id, title, description }) => (
          <div
            key={id}
            className="p-4 border border-gray-300 shadow-sm rounded-md mb-4"
          >
            <h2 className="text-balance">{title}</h2>
            <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

            {/* Action buttons */}
            <div className="flex justify-end items-center gap-4 mt-4">
              <Link
                to={`/admin/edit-article/${id}`}
                className="text-xs border border-burnham-600 text-burnham-700 px-4 py-1 rounded-md hover:bg-burnham-100 hover:border-burnham-200 transition-all duration-200 ease-out"
              >
                Edit
              </Link>
              <button
                type="button"
                className="text-gray-300 cursor-pointer bg-red-400 rounded-md px-2.5 py-1 text-sm hover:bg-red-500 transition-all duration-300 ease-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticles;
