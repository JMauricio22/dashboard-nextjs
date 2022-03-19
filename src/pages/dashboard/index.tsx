import { CashIcon, ArrowUpIcon } from '@heroicons/react/solid';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Product from '@customTypes/product';
import Chart from '@common/Chart';
import Loading from '@common/Loading';
import { generateRandomColors } from '@utils/generateRandomColors';

const PRODUCTS_LIMIT = 0;
const PRODUCTS_OFFSET = 0;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

const dashboardItems = [
  {
    title: 'Total Budget',
    amount: '$162,300',
    percentage: '+10.2%',
  },
  {
    title: 'Total Sales',
    amount: '$22K',
    percentage: '+8.7%',
  },
  {
    title: 'Total Income',
    amount: '$22K',
    percentage: '+7.4%',
  },
];

type CategoriesWithProducts = Record<string, Product[]>;

export default function Dashboard() {
  const { data: products, loading } = useFetch<Product>(
    endPoints.products.getProducts(PRODUCTS_LIMIT, PRODUCTS_OFFSET)
  );

  const categoriesWithProducts = products.reduce((obj: CategoriesWithProducts, product: Product) => {
    if (!obj[product.category.name]) {
      obj[product.category.name] = [];
    }
    obj[product.category.name].push(product);
    return obj;
  }, {});

  const categories = Object.keys(categoriesWithProducts);
  const categorieCount = Object.values(categoriesWithProducts).map((products: Product[]) => products.length);
  const categoryMaxPrice = Object.values(categoriesWithProducts).map((products: Product[]) =>
    Math.max(...products.map((product: Product) => product.price))
  );

  const onLoading = () => loading && <Loading />;

  const onRender = () =>
    !loading && (
      <div className="w-full grid pb-4 xl:grid-rows-dashboard-layout md:grid-rows-dashboard-layout xl:grid-cols-3 md:grid-cols-6 grid-rows-dashboard-layout-sm grid-cols-1 place-items-center gap-4">
        {dashboardItems.map((item) => (
          <div key={`Dashboard-item-${item.title}`} className="w-full max-w-full xl:col-span-1 md:col-span-2 h-40 dark:bg-gray-700 bg-white shadow-md rounded-lg flex items-center justify-center">
            {/* <div className="flex items-center"> */}
            <div className="flex flex-col items-center justify-start mr-5">
              <span className="lg:text-lg md:text-sm text-lg text-gray-300 dark:text-gray-400 font-semibold">
                {item.title}
              </span>
              <span className="xl:text-3xl md:text-sm lg:text-xl text-2xl text-black dark:text-gray-300 font-bold">
                {item.amount}
              </span>
            </div>
            <div className="flex items-center">
              <span className="xl:text-5xl lg:text-4xl md:text-2xl text-4xl text-green-600 font-semibold">
                {item.percentage}
              </span>
              <ArrowUpIcon className="text-green-600 w-5 h-5" />
            </div>
          </div>
        ))}
        <div className="w-full h-full xl:col-span-1 md:col-span-3 md:row-span-1 bg-white dark:bg-gray-700 shadow-md rounded-lg p-2">
          <Chart
            type="bar"
            labels={categories}
            data={categorieCount}
            title="Number of products by category"
            dataOptions={{
              backgroundColor: '#6366ed',
              label: 'products',
            }}
          />
        </div>
        <div className="xl:col-span-2 xl:row-span-2 md:row-span-2 md:col-span-3 w-full h-full bg-white dark:bg-gray-700 shadow-md rounded-lg md:p-3">
          <Chart
            type="doughnut"
            labels={categories}
            data={categoryMaxPrice}
            title="Maximum price of products by category"
            dataOptions={{
              backgroundColor: generateRandomColors(categorieCount.length),
              label: 'products',
            }}
          />
        </div>
        <div className="w-full h-full xl:col-span-1 md:col-span-3 md:row-span-1 bg-white dark:bg-gray-700 shadow-md rounded-lg p-2">
          <Chart
            type="line"
            labels={categories}
            data={categoryMaxPrice}
            title="Maximum price of products by category"
            dataOptions={{
              backgroundColor: '#6366ed',
              label: 'Maximum price',
              color: '#fff',
            }}
          />
        </div>
      </div>
    );

  return (
    <>
      {onLoading()}
      {onRender()}
    </>
  );
}

Dashboard.protected = true;
