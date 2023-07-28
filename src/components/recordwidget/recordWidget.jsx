import React from "react";
import profile from "../../assets/png/customerpic.png";
import { useNavigate } from "react-router-dom";
const RecordWidget = ({
  image,
  name,
  ordered,
  shipped,
  price,
  commission,
  
  sales,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white space-y-2 sm:space-y-3 w-full">
      <div
        onClick={() => {
          navigate("/product/1");
        }}
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
            {name}
          </div>
         
        </div>
        <div className="">{ordered}</div>
          <div className="">{shipped}</div>
        <div>{price}</div>
       
        <div>{`$${commission?.toLocaleString()}`}</div>
        <div>{`${sales?.toLocaleString()}`}</div>
        
      </div>
    </div>
  );
};

export default RecordWidget;
