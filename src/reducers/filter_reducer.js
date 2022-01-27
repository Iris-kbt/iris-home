import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        filtered: [...action.payload],
        allProducts: [...action.payload],
        filter: {
          ...state.filter,
          maxPrice,
          price: maxPrice,
        },
      };
      break;
    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };
      break;
    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };
      break;
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
      break;
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filter: { ...state.filter, [name]: value },
      };
      break;
    case SORT_PRODUCTS:
      const { sort, filtered } = state;
      let tempProducts = [...filtered];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filtered: tempProducts,
      };
      break;
    case FILTER_PRODUCTS:
      const { allProducts } = state;
      const { text, company, category, color, price, shipping } = state.filter;
      let filteredProducts = [...allProducts];
      if (text) {
        filteredProducts = filteredProducts.filter((p) => {
          return p.name.startsWith(text);
        });
      }
      if (company !== "all") {
        filteredProducts = filteredProducts.filter(
          (p) => p.company === company
        );
      }
      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === category
        );
      }
      if (color !== "all") {
        filteredProducts = filteredProducts.filter((p) =>
          p.colors.some((c) => c === color)
        );
      }
      if (price !== state.filter.maxPrice) {
        filteredProducts = filteredProducts.filter((p) => p.price <= price);
      }
      if (shipping) {
        filteredProducts = filteredProducts.filter((p) => p.shipping === true);
      }
      return {
        ...state,
        filtered: filteredProducts,
      };
      break;
    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          ...state.filter,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          price: state.filter.maxPrice,
          shipping: false,
        },
      };
      break;
    default:
      throw new Error(`No Matching "${action.type}" action type`);
      break;
  }
};

export default filter_reducer;
