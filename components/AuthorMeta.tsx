import React from 'react';
import {
  ClockIcon,
  PencilIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

const AuthorMeta = ({
  justify,
  author,
  tag,
}: {
  justify: string;
  author: string;
  tag: string;
}) => {
  return (
    <article className={`flex  text-sm gap-4 items-center ${justify} mt-4`}>
      <span className="flex items-center gap-1">
        <PencilIcon className="size-5 stroke-black" />
        <span className="text-gray-600">{author}</span>
      </span>
      <span className="flex items-center gap-1">
        <Square3Stack3DIcon className="size-5 stroke-black" />
        <span className="text-gray-600">{tag}</span>
      </span>
      <span className="flex items-center gap-1">
        <ClockIcon className="size-5 stroke-black" />
        <span className="text-gray-600">12 min. read</span>
      </span>
    </article>
  );
};

export default AuthorMeta;
