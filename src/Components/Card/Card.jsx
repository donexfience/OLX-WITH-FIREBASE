import React from "react";
import { BiHeart } from "react-icons/bi";
import { HiLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { BsFillLightningFill } from "react-icons/bs";

function Card({ data, isFeatured,handleProductClick }) {
  const cardClasses = classNames("p-3", {
    "border-yellow-300 border-l-4": isFeatured,
  });

 function click(product){
    console.log('click worked',product);
    handleProductClick(product)
  }
  return (
    <div className="lg:w-1/4 pr-5 mb-3 relative" onClick={()=>click(data)}>
      <div className="absolute top-1 left-0 h-5 w-[35%] bg-yellow-400 text-xs text-gray-600 flex items-center justify-center gap-2 rounded">
        <BsFillLightningFill className="text-blue" />
        featured
      </div>
      <div className="h-52 overflow-hidden p-3">
        <img src={data.image} alt="Product" className="mx-auto" />
      </div>
      <div className="px-3">
        <h2 className="font-bold text-xl">₹ {data.price}</h2>
        <h3 className="whitespace-nowrap overflow-hidden text-ellipsis">
          {data.productName}
        </h3>
        <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
          {data.description}
        </p>
      </div>
      <div className="bg-white w-fit p-2 rounded-full absolute top-3 right-8 shadow-md ">
        <BiHeart className="text-2xl" />
      </div>
      {isFeatured && (
        <div className="absolute top-3 left-2 flex items-center bg-yellow-300 text-sm w-fit rounded px-2 gap-1">
          <HiLightningBolt />
          Featured
        </div>
      )}
    </div>
  );
}

export default Card;
