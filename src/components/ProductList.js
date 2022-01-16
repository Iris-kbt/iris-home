import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered, gridView } = useFilterContext();

  if (filtered.length === 0) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (gridView) {
    return <GridView products={filtered} />;
  }

  return <ListView products={filtered} />;
};

export default ProductList;
