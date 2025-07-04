import React from 'react';
import {
  ClockIcon,
  PencilIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

const AuthorMeta = ({ justify }: { justify: string }) => {
  return (
    <article className={`flex  text-sm gap-4 items-center ${justify} mt-4`}>
      <span className="flex-center-gap-1">
        <PencilIcon className="size-5 stroke-black" />
        <span className="text-gray-600">Stephen Chao</span>
      </span>
      <span className="flex-center-gap-1">
        <Square3Stack3DIcon className="size-5 stroke-black" />
        <span className="text-gray-600">Design</span>
      </span>
      <span className="flex-center-gap-1">
        <ClockIcon className="size-5 stroke-black" />
        <span className="text-gray-600">12 min. read</span>
      </span>
    </article>
  );
};

export default AuthorMeta;
