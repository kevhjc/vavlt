import Image from 'next/image';
import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import format from 'date-fns/format';
import cn from 'classnames';

import { ImageProps } from '../lib/interfaces';
import { slugify } from '../lib/utils';

export default function PostGrid({ images }: { images: ImageProps[] }) {
  const [postNum, setPostNum] = useState<number>(10);

  const handleLoadMorePosts = () => {
    setPostNum((previousPostNum) => previousPostNum + 10);
  };

  return (
    <div className="px-6 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {images.slice(0, postNum).map((image: ImageProps) => (
          <Post key={image.id} image={image} />
        ))}
      </div>
      {postNum < images.length && (
        <div className="flex justify-start">
          <button
            className="p-2 px-4 mt-12 text-sm font-medium transition-all rounded cursor-pointer bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            onClick={handleLoadMorePosts}
          >
            More posts &darr;
          </button>
        </div>
      )}
    </div>
  );
}

function Post({ image }: { image: ImageProps }) {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="group">
        <div className="relative overflow-hidden scale-100 bg-white rounded-lg">
          <Image
            alt=""
            src={image.href}
            layout="responsive"
            width={500}
            height={500}
            objectFit="cover"
            className={cn(
              'cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[0.97]',
              isLoading ? 'scale-110 blur-2xl' : 'scale-95 blur-0'
            )}
            onLoadingComplete={() => setLoading(false)}
            onClick={openModal}
          />
        </div>
        <span className="inline-block mt-2 text-md text-neutral-800 dark:text-neutral-100">
          {format(new Date(image.created_at), 'MMMM d, yyyy')}
        </span>
        <div className="flex flex-wrap mt-1 text-sm font-medium">
          {image.brands.map((brand, index) => (
            <div key={brand}>
              <a
                href={`/brands/${slugify(brand)}`}
                className="text-neutral-500/80 hover:underline dark:text-neutral-300/80"
              >
                {brand}
              </a>
              <span className="mr-1 text-neutral-400 dark:text-neutral-500">
                {index < image.brands.length - 1 ? ',' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 px-4 overflow-auto min-w-auto"
          initialFocus={closeButtonRef}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-cover bg-neutral-500 bg-opacity-20 backdrop-blur-md firefox:bg-opacity-80 dark:bg-neutral-900/80" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
              ref={closeButtonRef}
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform shadow-xl rounded-xl bg-neutral-100 md:max-w-2xl dark:bg-neutral-800">
                <button
                  className="absolute top-0 right-0 bottom-auto left-auto p-3 transition-all duration-200 translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-sm stroke-1 stroke-neutral-800 hover:bg-neutral-100 dark:bg-neutral-500 dark:stroke-white dark:hover:bg-neutral-600"
                  onClick={closeModal}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Image
                  alt=""
                  src={image.href}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="scale-100 rounded-lg blur-0"
                />
                <Dialog.Title>
                  <p className="mt-4 text-md text-neutral-700 dark:text-neutral-100">
                    {format(new Date(image.created_at), 'MMMM d, yyyy')}
                  </p>
                </Dialog.Title>
                <div className="grid grid-flow-col gap-8 mt-4 text-sm md:text-md auto-cols-max md:gap-12">
                  <div className="flex flex-col text-neutral-500 dark:text-neutral-400/80">
                    {image.categories.map((category) => (
                      <ul key={category} className="">
                        {category}
                      </ul>
                    ))}
                  </div>
                  <div className="flex flex-col text-neutral-600 dark:text-neutral-100">
                    {image.brands.map((brand) => (
                      <a
                        key={brand}
                        href={`/brands/${slugify(brand)}`}
                        className="w-fit text-neutral-800 hover:underline dark:text-neutral-100"
                      >
                        {brand}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
