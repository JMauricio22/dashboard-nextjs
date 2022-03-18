import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';

type PaginationProps = {
  limit: number;
  page: number;
  total: number;
  onChangePageHandler(page: number): void;
  items: number[];
  children: React.ReactElement;
};

export default function Pagination({ limit, onChangePageHandler, total, page, items, children }: PaginationProps) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6 dark:bg-gray-800">
      <div className="flex-1 flex justify-between sm:hidden">
        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        {children}
        <div>
          <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:rounded-full dark:bg-transparent dark:hover:text-gray-700"
              onClick={() => onChangePageHandler(1)}
            >
              <span className="sr-only">Firts element</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:rounded-full dark:bg-transparent dark:hover:text-gray-700"
              disabled={page - 1 < 1}
              onClick={() => onChangePageHandler(page - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {items.map((item) => {
              const isActive = item === page;
              const buttonStyles = isActive
                ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:text-indigo-800'
                : 'bg-white border-gray-300 text-gray-500';

              return (
                <button
                  key={`pagination-button-${item}`}
                  className={
                    buttonStyles +
                    ' hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium dark:rounded-full dark:bg-transparent dark:hover:text-gray-700'
                  }
                  onClick={() => onChangePageHandler(item)}
                  disabled={limit * item - (limit - 1) > total}
                >
                  {item}
                </button>
              );
            })}

            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:rounded-full dark:bg-transparent dark:hover:text-gray-700"
              onClick={() => onChangePageHandler(page + 1)}
              disabled={(page + 1) * limit - (limit - 1) > total}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:rounded-full dark:bg-transparent dark:hover:text-gray-700"
              onClick={() => onChangePageHandler(Math.ceil(total / limit))}
              disabled={(page + 1) * limit - (limit - 1) > total}
            >
              <span className="sr-only">Last element</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
