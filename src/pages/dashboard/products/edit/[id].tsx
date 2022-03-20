import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import endPoints from '@services/api';
import FormProduct from '@components/FormData';
import Notification from '@components/Notification';
import useNotification from '@hooks/useNotification';
import Product, { FormInputsWithoutImages } from '@customTypes/product';
import Loading from '@common/Loading';

export default function EditProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { notification, showNotification, closeNotification } = useNotification();
  const [product, setProduct] = useState<FormInputsWithoutImages>({} as FormInputsWithoutImages);

  const fetchProduct = async () => {
    try {
      const { id } = router.query;
      const { data }: AxiosResponse<Product> = await axios.get(endPoints.products.getProduct(id));
      setProduct({
        ...data,
        categoryId: data.category.id.toString(),
      });
      setLoading(false);
    } catch (error) {
      /*  */
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchProduct();
    }
  }, [router?.isReady]);

  return (
    <>
      <Notification notification={notification} closeNotification={closeNotification} />
      {loading ? <Loading /> : <FormProduct showNotification={showNotification} product={product} />}
    </>
  );
}
