import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import RecordWidget from "../recordwidget/recordWidget";
import Container from "../admincontainer/container";
import { getVideos } from "../../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function AdminVideos() {
  const [data, setdata] = useState([])
  const [totalItems, setTotalItems] = useState(null)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const {token, currentUser} = useSelector((state) => state.user)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    async function fetchVideos () {
      const payload = {
        page: page,
        limit: 10,
        order: null,
        userID: currentUser?._id
      }
      setloading(true)
      await getVideos(token, payload)
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
        console.log(err.response.data?.response)
        console.log(err.response.data?.error?.message)
       
      
      });
    }

    fetchVideos()
    //eslint-disable-next-line
  },[page])

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

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <RecordWidget
                key={v}
                image={""}
                name={"How to make money online"}
                views={"100"}
                active={''}
                commission={"1000"}
                sales={"1000"}
                tab={"Videos"}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AdminVideos;
