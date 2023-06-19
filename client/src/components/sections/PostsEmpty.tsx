import React from 'react';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';

interface PostsEmptyProps {
  text?: string;
}

const PostsEmpty: React.FC<PostsEmptyProps> = ({ text }) => {
  return (
    <Card className='flex h-[50vh] flex-col items-center justify-center'>
      <Typography component='h2' variant='title-2'>
        {text ?? 'no posts found'}
      </Typography>
      <div className='text-[7rem]'>🤔</div>
    </Card>
  );
};

export default PostsEmpty;
