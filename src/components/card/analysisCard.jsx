import React from "react";
import { useEffect, useState } from "react";
import { MdShowChart, MdOutlineScale, MdShoppingBasket } from "react-icons/md";
import { getMetrics } from "../../Utils/api";
import { useSelector } from "react-redux";

const AnalysisCard = () => {
  const {token} = useSelector((state) => state.user)
  const [data, setdata] = useState()
  useEffect(() => {
    async function getMetric() {
      await getMetrics(token)
        .then((res) => {
          console.log(res);
          setdata(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getMetric();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[98%] mx-auto sm:w-[95%] h-full">
      <div className="dashboard-scroll-style w-full h-fit overflow-x-auto">
        <div className="min-w-[1080px] rounded-2xl shadow-lg ">
          <div className=" w-full grid gap-3 grid-cols-4 items-center h-[150px] p-3 bg-white">
            <div className="w-full flex flex-col items-center justify-center space-y-3 bg-white shadow-2xl rounded-2xl h-full px-4 py-2">
              <div className="flex items-center space-x-2 ">
                <div className="w-fit h-fit rounded-full p-2 bg-[#51CBFF] bg-opacity-20 flex items-center justify-center">
                  <div className="rounded-md bg-[#51CBFF] p-1 ">
                    <MdShowChart className="text-[15px] text-white" />
                  </div>
                </div>

                <span className="text-gray-500 whitespace-nowrap">
                  Items Shipped Revenue
                </span>
              </div>
              <div className="text-2xl">{data?.shipped_items_revenue|| '$0'}</div>
            </div>
            {/** */}
            <div className="w-full flex flex-col items-center justify-center space-y-3 bg-white shadow-2xl rounded-2xl h-full p-4">
              <div className="flex items-center space-x-2 ">
                <div className="w-fit h-fit rounded-full p-2 bg-[#23AF72] bg-opacity-20 flex items-center justify-center">
                  <div className="rounded-md bg-none p-1 ">
                    <MdOutlineScale className="text-[15px] text-[#23AF72]" />
                  </div>
                </div>

                <span className="text-gray-500 whitespace-nowrap">
                  Total Shipped
                </span>
              </div>
              <div className="text-2xl">{data?.shipped_items | '0'}</div>
            </div>
            {/** */}
            <div className="w-full flex flex-col items-center justify-center space-y-3 bg-white shadow-2xl rounded-2xl h-full p-4">
              <div className="flex items-center space-x-2 ">
                <div className="w-fit h-fit rounded-full p-2 bg-[#FD1F9B] bg-opacity-20 flex items-center justify-center">
                  <div className="rounded-md bg-none ">
                    <MdShoppingBasket className="text-[18px] text-[#FD1F9B]" />
                  </div>
                </div>

                <span className="text-gray-500 whitespace-nowrap">
                  Total Ordered 
                </span>
              </div>
              <div className="text-2xl">{data?.ordered_items || '0'}</div>
            </div>
            {/** */}
            <div className="w-full flex flex-col items-center bg-white shadow-2xl rounded-2xl justify-center space-y-3 h-full p-4">
              <div className="flex items-center space-x-2 ">
                <div className="w-fit h-fit rounded-full p-2 bg-[#FD1F9B] bg-opacity-20 flex items-center justify-center">
                  <div className="rounded-md bg-none ">
                    <MdShoppingBasket className="text-[18px] text-[#FD1F9B]" />
                  </div>
                </div>

                <span className="text-gray-500 whitespace-nowrap">
                  Summary
                </span>
              </div>
              <div className="text-2xl">{data?.summary || '$0'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
