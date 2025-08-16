import React from 'react';
import { TagIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

const AuthorMeta = ({
  justify,
  author,
  tag,
  posted,
}: {
  justify: string;
  author: string;
  tag: string;
  posted?: string;
}) => {
  return (
    <article className={`flex  text-sm gap-4 items-center ${justify} mb-4`}>
      <span className="flex items-center gap-1">
        <UserIcon className="size-5 stroke-black" />
        <span className="text-gray-600">{author}</span>
      </span>
      <span className="flex items-center gap-1">
        <TagIcon className="size-5 stroke-black" />
        <span className="text-gray-600">{tag}</span>
      </span>
      <span className="flex items-center gap-1">
        <CalendarIcon className="size-5 stroke-black" />
        <span className="text-gray-600">{posted}</span>
      </span>
    </article>
  );
};

export default AuthorMeta;
