import React from "react";
import profile from "../../assets/png/products.jpg";
const RecordWidget = ({
  image,
  name,
  ordered,
  shipped,
  price,
  commission,
  sales,
}) => {
 
  return (
    <div className="bg-white space-y-2 sm:space-y-3 w-full">
      <div
        className="w-full items-center  px-3 py-3 grid grid-cols-9 gap-2 border border-gray-300 rounded-sm"
      >
        <div className="grid grid-cols-6 items-center col-span-3">
          <div className="rounded-full h-[30px] w-[30px] sm:h-[35px] sm:w-[35px]">
            <img
              src={image || profile}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="col-span-5 whitespace-nowrap text-ellipsis w-[190px] overflow-hidden ">
            {name || 'nil'}
          </div>
         
        </div>
        <div className="">{ordered || '0'}</div>
          <div className="">{shipped || '0'}</div>
        <div>{price || '$0'}</div>
       
        <div>{`${commission?.toLocaleString()}` || '$0'}</div>
        <div>{`${sales?.toLocaleString()}` || '$0'}</div>
        
      </div>
    </div>
  );
};

export default RecordWidget;
