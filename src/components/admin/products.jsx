import React, { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import RecordWidget from "../recordwidget/recordWidget";
import Container from "../admincontainer/container";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Utils/api";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function AdminProducts() {
  const { token, currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      page: page,
      limit: 10,
      userID: currentUser?._id,
    };
    async function fetchVideo() {
      setloading(true);
      await getProducts(token, payload)
        .then((res) => {
          console.log(res.data);
          setloading(false);
          const { items, totalItems } = res.data;
          setdata(items);
          const totalPage = Math.ceil(totalItems / 10);
          const pageNumbers = [...Array(totalPage).keys()].map(
            (page) => page + 1
          );

          setTotalItems(pageNumbers);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          console.log(err.response.data?.error?.message);
          
        });
    }

    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container>
      <div className="w-full h-full px-2  sm:px-6 bg-white pt-4 sm:pt-16">
        <div className="dashboard-scroll-style w-full h-fit overflow-x-auto">
          <div className="w-full min-w-[1000px] space-y-3">
            <div className="w-full items-center bg-white px-3 py-3 sm:py-5 grid grid-cols-9 gap-2 text-gray-500">
              <div className="flex space-x-2 items-center col-span-3">
                <AiOutlinePlayCircle className="text-[#005ABC] text-[25px]" />
                <span>Name</span>
              </div>
              <div>Views</div>
              <div className="col-span-2">Date</div>
              <div>Commission</div>
              <div>Sales</div>
              <div>Status</div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
              <RecordWidget
                key={v}
                image={""}
                name={"Apple air pod"}
                views={"100"}
                active={""}
                commission={"1000"}
                sales={"1000"}
                tab={"Products"}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AdminProducts;
