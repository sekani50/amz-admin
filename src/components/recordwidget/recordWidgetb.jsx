import React from "react";
import profile from "../../assets/png/products.jpg";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";
const RecordWidgetB = ({
  image,
  name,
  id,
  avgViewtime,
  avgView,
  status,
  video,
}) => {
  
  const [isCopy, setCopy] = useState(false);

  const copyLink = () => {
    copy(video);
    setCopy(true);
  };
  return (
    <div className="bg-white space-y-2 sm:space-y-3 w-full">
      <div className="w-full items-center  px-3 py-3 grid grid-cols-9 gap-2 border border-gray-300 rounded-sm">
        <Link
          to={`/product/${id}`}
          className="grid grid-cols-6 items-center col-span-3"
        >
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
        </Link>
        <div className="col-span-2">{avgView|| '0'}</div>
        <div className="col-span-2">{avgViewtime || '0'}</div>

        <div>{status}</div>
        <div
          className={`${isCopy ? "text-green-500" : "text-blue-500"}`}
          onClick={(e) => {
            e.stopPropagation();
            copyLink();
          }}
        >
          {isCopy ? (
            <span className="flex space-x-1 items-center">
              <span>Copied</span>
              <BsCheck2All className="text-[15px] " />
            </span>
          ) : (
            "Copy link"
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordWidgetB;
