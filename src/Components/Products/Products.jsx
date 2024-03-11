import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import Card from "../Card/Card";
import ProductDetails from "./ProductDetails";

function Products() {
  const { data, incrementLimit, error } = useData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    console.log(product, '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {selectedProduct ? (
        <ProductDetails product={selectedProduct} closeModal={closeModal} />
      ) : (
        data && (
          <div className="m-16 rounded py-5 px-10 relative">
            <h1 className="text-2xl pb-3">Fresh Recommendations</h1>
            <div className="flex flex-wrap">
              {data.map((product, key) => (
                <Card
                  key={key}
                  data={product}
                  handleProductClick={handleProductClick}
                />
              ))}
              {error && (
                <div>
                  <h1 className="text-red-500">{error}</h1>
                </div>
              )}
            </div>
          </div>
        )
      )}

      <div className="flex justify-center" onClick={incrementLimit}>
        <button className="border-2 rounded border-black p-3 font-bold hover:border-4 mb-10 hover:mb-9">
          Load More
        </button>
      </div>
    </>
  );
}

export default Products;
