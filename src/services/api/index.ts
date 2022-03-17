const API = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${API_VERSION}/auth/login`,
    profile: `${API}/api/${API_VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id) => `${API}/api/${API_VERSION}/products/${id}/`,
    allProducts: `${API}/api/${API_VERSION}/products/`,
    getProducts: (limit, offset) =>
      `${API}/api/${API_VERSION}/products?limit=${limit}&offset=${offset}`,
    addProducts: `${API}/api/${API_VERSION}/products`,
    updateProducts: (id) => `${API}/api/${API_VERSION}/products/${id}/`,
    deleteProducts: (id) => `${API}/api/${API_VERSION}/products/${id}/`,
  },
  categories: {
    getCategoriesList: `${API}/api/${API_VERSION}/categories/`,
    addCategory: `${API}/api/${API_VERSION}/categories/`,
    getCategoryItems: (id) =>
      `${API}/api/${API_VERSION}/categories/${id}/products/`,
    updateCategory: (id) => `${API}/api/${API_VERSION}/categories/${id}/`,
  },
  files: {
    addImage: `${API}/api/${API_VERSION}/files/upload/`,
  },
};

export default endPoints;
