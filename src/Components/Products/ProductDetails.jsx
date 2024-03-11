import React, { useState } from "react";

function ProductDetails({ product, closeModal }) {
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} ${product.productName}(s)!`);
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
          <img src={product.image} alt="" className="mx-auto mb-4" />
          <p className="text-gray-600">Product Name: {product.category}</p>
          <p className="text-gray-600">Price: ${product.price}</p>
          <p className="text-gray-600">Description: {product.description}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg w-16 px-2 py-1 my-4"
          />
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
        <button
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-black"
          onClick={closeModal}
        >
          X
        </button>
    </div>
  );
}

export default ProductDetails;
