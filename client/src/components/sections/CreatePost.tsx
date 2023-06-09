import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import FileService from '@/services/file.service';
import { useCreatePostMutation } from '@/services/post.service';
import { Tag } from '@/types/tag.types';

import SearchTag from './SearchTag';
import Tags from './Tags';
import UploadPhoto from './UploadPhoto';

export interface ICreatePost {
  text: string;
}

const CreatePost: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreatePost>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);

  const { accessToken } = useAppSelector((state) => state.user);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && accessToken) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const data = await FileService.sendFile({ accessToken, body: formData }).then(
        (response) => response.json()
      );

      setImgURL(data.imgURL);
    }
  };

  const onClickAddTag = (tag: Tag) => {
    const existTag = selectedTags.some((selectedTag) => selectedTag.id === tag.id);
    if (!existTag) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      // TODO алерт про уже наличие такого тега
    }
  };
  const onClickRemoveTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
  };

  const onSubmit = async (data: any) => {
    const tags = selectedTags.map((tag) => tag.name).join(',');
    await createPost({ accessToken, ...data, tags, img: imgURL });

    setImgURL(null);
    reset();
  };

  return (
    <Card className='flex flex-col gap-2'>
      {imgURL && (
        <div className='h-96 cursor-pointer bg-black'>
          <img src={imgURL} alt='preview' className='mx-auto h-full object-cover' />
        </div>
      )}
      <SearchTag onClickTag={onClickAddTag} />
      {selectedTags.length > 0 && (
        <Tags data={selectedTags} className='p-0' onClick={onClickRemoveTag} />
      )}
      <div className='flex w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-row justify-end gap-2'
        >
          <UploadPhoto className='mt-[6px] flex items-start' onChangeFile={changeFileHandler}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              className='h-8 w-8 stroke-primary hover:stroke-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
              />
            </svg>
          </UploadPhoto>

          <Input
            name='text'
            id='text-post'
            placeholder='enter the text post...'
            optionals={{
              ...register('text', {
                maxLength: {
                  value: 280,
                  message: 'maximum post length 280 characters',
                },
              }),
            }}
            error={errors.text ? errors.text.message : undefined}
          />
          <button type='submit' disabled={isLoading} className='mt-[5px] flex items-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-8 w-8 stroke-primary hover:stroke-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </button>
        </form>
      </div>
    </Card>
  );
});

export default CreatePost;
