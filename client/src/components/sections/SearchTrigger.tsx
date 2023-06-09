import React from 'react';

import searchIcon from '@/assets/icons/search.svg';
import { cn } from '@/utils/cn';

import Typography from '../ui/Typography';

interface SearchProps {
  placeholder: string;
  className?: string;
  onClick?: any;
}

const SearchTrigger: React.FC<SearchProps> = ({ placeholder, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex cursor-pointer w-52 pl-10 items-center rounded bg-input relative border-2 border-input text-input-foreground hover:border-primary',
        className
      )}
    >
      <img src={searchIcon} alt='search' className='absolute left-0.5 top-0 max-h-full p-1' />
      <Typography component='span' variant='text'>
        {placeholder}
      </Typography>
    </button>
  );
};

export default SearchTrigger;
