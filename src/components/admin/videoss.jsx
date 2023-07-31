import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Container from "../admincontainer/container";
import { getVideos } from "../../Utils/api";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import empty from "../../assets/png/emptyorder.png";
import RecordWidgetB from "../recordwidget/recordWidgetb";
import { useNavigate, useParams } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";
function AdminVideos() {
  const {id} = useParams()
  const [data, setdata] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchVideos() {
      const payload = {
        page: page,
        limit: 10,
        order: null,
        userID: id,
      };
      setloading(true);
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
          console.log(err.response.data?.response);
          console.log(err.response.data?.error?.message);
        });
    }

    fetchVideos();
    //eslint-disable-next-line
  }, [page]);

  return (
    <Container>
      <div className="relative w-full h-full px-2  sm:px-6 bg-white pt-4 sm:pt-16">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="absolute top-3 left-3 cursor-pointer w-fit h-fit flex space-x-2 items-center"
      >
        <MdNavigateBefore className="text-[22px]" />
        Back
      </div>
        <div className="dashboard-scroll-style w-full h-fit overflow-x-auto">
          <div className="w-full min-w-[1000px] space-y-3">
            <div className="w-full items-center bg-white px-3 py-3 sm:py-5 grid grid-cols-9 gap-2 text-gray-500">
              <div className="flex space-x-2 items-center col-span-3">
                <AiOutlinePlayCircle className="text-[#005ABC] text-[25px]" />
                <span>Title</span>
              </div>
              <div className="col-span-2">Average Views</div>
              <div className="col-span-2">Avg. View Duraton</div>
              <div>Status</div>
              <div>Video Link</div>
            </div>
            {loading && (
              <div className="w-full items-center justify-center flex h-[300px]">
                <div className="justify-center flex w-fit h-fit items-center">
                  <LoaderIcon className="w-10 animate-spin text-[#005ABC]" />
                </div>
              </div>
            )}
            {!loading && data?.length === 0 && (
              <div className="w-full h-[300px] flex justify-center items-center">
                <span className="w-[200px] h-[200px]">
                  <img className="w-full h-full" src={empty} alt="" />
                </span>
              </div>
            )}

            {!loading &&
              data.length > 0 &&
              data?.map(
                (
                  {
                    title,
                    image,
                    avg_percent_view,
                    avg_view_duration,
                    status,
                    video,
                    id,
                  },
                  idx
                ) => (
                  <RecordWidgetB
                    key={idx}
                    image={image}
                    id={id}
                    name={title}
                    video={video}
                    avgView={avg_percent_view}
                    avgViewtime={avg_view_duration}
                    status={status}
                  />
                )
              )}
          </div>
        </div>
      </div>
      {totalItems && (
        <div className="mt-8 w-full">
          <div className="flex justify-center space-x-1 items-center">
            {totalItems?.map((pagenumber, idx) => {
              return (
                <button
                  onClick={() => {
                    setPage(pagenumber);
                  }}
                  key={idx}
                  className={`hover:bg-foreground text-white hover:text-background w-fit rounded-lg h-[30px] px-3 ${
                    page === pagenumber ? "bg-pink-600" : "bg-[#0449a4]"
                  }`}
                >
                  {pagenumber}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}

export default AdminVideos;
