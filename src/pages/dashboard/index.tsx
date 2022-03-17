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
      <div className="w-full h-auto flex flex-col lg:flex-row lg:flex-wrap overflow-hidden">
        <div className="lg:w-1/2">
          <Chart
            type="bar"
            labels={categories}
            data={categorieCount}
            title="Cantidad de productos por categoria"
            dataOptions={{
              backgroundColor: '#6366ed',
              label: 'productos',
            }}
          />
        </div>
        <div className="lg:w-1/2">
          <Chart
            type="line"
            labels={categories}
            data={categoryMaxPrice}
            title="Precio maximo de productos por categoria"
            dataOptions={{
              backgroundColor: '#6366ed',
              label: 'precio maximo',
            }}
          />
        </div>
        <div className="lg:w-1/2">
          <Chart
            type="pie"
            labels={categories}
            data={categorieCount}
            title="Cantidad de productos por categoria"
            dataOptions={{
              backgroundColor: generateRandomColors(categorieCount.length),
              label: 'productos',
            }}
          />
        </div>
        <div className="lg:w-1/2">
          <Chart
            type="doughnut"
            labels={categories}
            data={categoryMaxPrice}
            title="Precio maximo de productos por categoria"
            dataOptions={{
              backgroundColor: generateRandomColors(categorieCount.length),
              label: 'productos',
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
