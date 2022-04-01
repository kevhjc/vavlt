import Image from 'next/image';
import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

type Image = {
  id: number;
  href: string;
  name: string;
  brand: string;
  category: string;
};

export default function Gallery() {
  const images = [
    {
      id: 1,
      href: 'https://goods.ams3.digitaloceanspaces.com/store/ac8cf531b4ae816c3ea44e75cc7ece18.png',
      name: 'Pullover',
      brand: 'Patagonia',
      category: 'tops',
    },
    {
      id: 2,
      href: 'https://goods.ams3.digitaloceanspaces.com/store/8d60864d4c54ea3d5d1d2a2215af1462.png',
      name: 'Watch',
      brand: 'Omega',
      category: 'accessories',
    },
    {
      id: 3,
      href: 'https://goods.ams3.digitaloceanspaces.com/store/ab8639144f46068cb10dcaa66e9f1651.png',
      name: 'Jacket',
      brand: 'Apple',
      category: 'outerwear',
    },
    {
      id: 4,
      href: 'https://goods.ams3.digitaloceanspaces.com/store/aa29559f398a616d1be7a48833815492.png',
      name: 'Leather Bag',
      brand: 'Example',
      category: 'accessories',
    },
    {
      id: 5,
      href: 'https://goods.ams3.digitaloceanspaces.com/store/f563558ea039e95cde60553b9524ccab.png',
      name: '327',
      brand: 'New Balance',
      category: 'footwear',
    },
  ];
  return (
    <div className="px-6 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

function BlurImage({ image }: { image: Image }) {
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
        <div className="duration-200 ease-in-out rounded-lg cursor-pointer bg-neutral-200 hover:bg-neutral-300/80 dark:bg-neutral-800 dark:hover:bg-neutral-800/60">
          <Image
            alt=""
            src={image.href}
            layout="responsive"
            width={500}
            height={500}
            objectFit="cover"
            className={cn(
              'duration-200 ease-in-out hover:-translate-y-1',
              isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'
            )}
            onLoadingComplete={() => setLoading(false)}
            onClick={openModal}
          />
        </div>
        <a href={image.href}>
          <span className="inline-block mt-2 text-md text-neutral-700 hover:underline dark:text-neutral-100">
            {image.name}
          </span>
        </a>
        <div className="mt-1 text-sm font-medium text-neutral-400">
          {image.brand} {' — '}
          <a href={`/categories/${image.category}`}>
            <span className="inline-block text-md hover:underline">
              {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
            </span>
          </a>
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
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-cover bg-opacity-20 backdrop-blur-md" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
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
              <div className="inline-block w-full max-w-md p-8 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-xl dark:bg-neutral-900 md:max-w-2xl">
                <button
                  className="absolute top-0 right-0 bottom-auto left-auto p-3 translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full shadow-md stroke-2 stroke-white ring-red-600 hover:bg-red-700 md:p-4"
                  ref={closeButtonRef}
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Dialog.Title>
                  <p className="mb-4 font-bold text-md text-neutral-700 dark:text-neutral-100">
                    {'April 1, 2022'}
                  </p>
                </Dialog.Title>
                <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    alt=""
                    src={image.href}
                    layout="responsive"
                    width={500}
                    height={500}
                    objectFit="cover"
                    className={cn(
                      isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-2 text-sm font-medium md:text-md text-neutral-600 dark:text-neutral-100">
                  <a href={`/categories/${image.brand}`}>
                    <button className="p-2 rounded bg-neutral-200/70 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                      {' '}
                      {'Patagonia'}
                    </button>
                  </a>
                  <a href={`/categories/${image.category}`}>
                    <button className="p-2 rounded bg-neutral-200/70 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                      {'Rolex'}
                    </button>
                  </a>
                  <a href={`/categories/${image.category}`}>
                    <button className="p-2 rounded bg-neutral-200/70 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                      {' '}
                      {'Nike'}
                    </button>
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
