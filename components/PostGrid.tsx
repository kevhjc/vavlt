import Image from 'next/image';
import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import format from 'date-fns/format';

import { ImageProps } from '../lib/interfaces';
import { slugify } from '../lib/utils';

export default function PostGrid({ images }: { images: ImageProps[] }) {
  return (
    <div className="px-6 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {images.map((image: ImageProps) => (
          <Post key={image.id} image={image} />
        ))}
      </div>
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
        <div className="overflow-hidden rounded-lg">
          <Image
            alt=""
            src={image.href}
            layout="responsive"
            width={500}
            height={500}
            objectFit="cover"
            className={
              isLoading
                ? 'scale-110 blur-2xl'
                : 'scale-100 cursor-pointer rounded-lg blur-0 duration-200 ease-in-out hover:scale-[1.02]'
            }
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
                className="text-neutral-600/80 hover:underline dark:text-neutral-400/80"
              >
                {brand}
              </a>
              <span className="mr-1 text-neutral-500 dark:text-neutral-400">
                {index < image.brands.length - 1 ? ',' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 px-4 overflow-y-auto min-w-fit"
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
              <Dialog.Overlay className="fixed inset-0 bg-cover bg-opacity-20 backdrop-blur-md" />
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
              <div className="inline-block w-full max-w-md p-8 my-8 text-left align-middle transition-all transform shadow-xl rounded-xl bg-neutral-100 md:max-w-2xl dark:bg-neutral-800">
                <button
                  className="absolute top-0 right-0 bottom-auto left-auto p-3 translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full shadow-md stroke-2 stroke-white hover:bg-red-700"
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
                <div className="flex flex-wrap gap-2 mt-4 text-xs font-medium md:text-md text-neutral-600 dark:text-neutral-100">
                  {image.brands.map((brand) => (
                    <a
                      key={brand}
                      href={`/brands/${slugify(brand)}`}
                      className="p-2 rounded bg-neutral-200/70 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    >
                      {brand}
                    </a>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
