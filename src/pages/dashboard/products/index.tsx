import { Fragment, SyntheticEvent, useState } from 'react';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Product from '@customTypes/product';
import Pagination from '@components/Pagination';
import RowSkeleton from '@components/RowSkeleton';
import axios from 'axios';
import { ChevronDownIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import Modal from '@common/Modal';
import FormData from '@components/FormData';
import Notification from '@components/Notification';
import useModal from '@hooks/useModal';
import useNotification from '@hooks/useNotification';
import { deleteProduct } from '@services/api/products';
import { NotificationsIcons } from '@hooks/useNotification';
import Link from 'next/link';
import usePagination from '@hooks/usePagination';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PRODUCTS_LIMIT = 9;
const PAGINATION_SIZE = 5;

export default function Products() {
  const { open: openModal, setOpen: setOpenModal, toggle: toggleModal } = useModal();
  const { notification, showNotification, closeNotification } = useNotification();
  const { data: products, loading, setLoading } = useFetch<Product>(endPoints.products.allProducts);
  const { page, items, offset, onChangePageHandler, paginationInfo } = usePagination(
    PAGINATION_SIZE,
    PRODUCTS_LIMIT,
    products.length
  );

  const imageNotFound = async (event: SyntheticEvent) => {
    const image = event.target as HTMLImageElement;
    const { data } = await axios.get('/no_image_found.jpg', {
      responseType: 'blob',
    });
    image.src = URL.createObjectURL(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      showNotification('Succesfully deleted!', 'Product was succesfully deleted.');
      setLoading(true);
      onChangePageHandler(1);
    } catch (error: any) {
      console.log(error);
      showNotification('Error!', error.message, NotificationsIcons.error);
    }
  };

  const afterFormSubmitted = () => {
    setLoading(true);
    toggleModal();
  };

  return (
    <>
      <Notification notification={notification} closeNotification={closeNotification} />
      <Modal open={openModal} setOpen={setOpenModal}>
        <FormData showNotification={showNotification} afterFormSubmitted={afterFormSubmitted} />
      </Modal>
      <div className="flex items-center justify-between px-2 md:px-0 mb-4">
        <div className="flex-1 min-w-0 flex items-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-gray-400">
            Product List
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4 items-center">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleModal}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create
            </button>
          </span>
        </div>
      </div>
      <div className="flex flex-col relative">
        {!loading && (
          <Pagination
            page={page}
            limit={PRODUCTS_LIMIT}
            items={items}
            onChangePageHandler={onChangePageHandler}
            total={products.length}
          >
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-medium">{paginationInfo.from}</span> to{' '}
                <span className="font-medium">{paginationInfo.to}</span> of{' '}
                <span className="font-medium">{paginationInfo.total}</span> results
              </p>
            </div>
          </Pagination>
        )}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      ID
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                  {loading ? (
                    <RowSkeleton rowCount={PRODUCTS_LIMIT || 5} colCount={6} />
                  ) : (
                    products.slice(offset, offset + PRODUCTS_LIMIT).map((product: Product) => (
                      <tr key={`Product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={product.images[0]} onError={imageNotFound} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-400">
                                {product.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-400">{product.category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-400">$ {product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-indigo-600 dark:text-gray-400">
                            {product.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/dashboard/products/edit/${product.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-800">Edit</a>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <TrashIcon
                            className="w-5 h-5 text-red-400 cursor-pointer"
                            onClick={() => handleDelete(product.id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Products.protected = true;
