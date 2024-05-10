import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
      break;
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
      break;
    case GET_PRODUCTS_BEGIN:
      return { ...state, productsLoading: true };
      break;
    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = action.payload?.data.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        featuredProducts,
      };
      break;
    case GET_PRODUCTS_ERROR:
      return { ...state, productsLoading: false, productsError: true };
      break;
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        singleProductLoading: true,
        singleProductError: false,
      };
      break;
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductLoading: false,
        singleProduct: action.payload,
      };
      break;
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductLoading: false,
        singleProductError: true,
      };
      break;
    default:
      throw new Error(`No Matching "${action.type}" action type`);
      break;
  }
};

export default products_reducer;
