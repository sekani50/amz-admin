import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../admincontainer/container";
import avatar from "../../assets/png/customerpic.png";
import empty from "../../assets/png/emptyorder.png"
import { LoaderIcon } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUsers } from "../../Utils/api";
function UserManagement() {
  const [actions, setAction] = useState(null);
  const { token , currentUser} = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const payload = {
      page: page,
      limit: 10,
      userID: currentUser?._id
    }
    async function fetchUsers() {
      setloading(true);
      await getUsers(token, payload)
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
          console.log(err.response.data?.error?.message)
          if(err.response.data?.error?.message) {
            
            toast.error('Verification required. Go to Settings')
          }
          
        });
    }

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  
  return (
      <Container>
        <div className="w-full h-full px-2  sm:px-6 bg-white pt-4 sm:pt-16">
          <h1 className="text-xl font-bold">Users</h1>
          <div className="grid grid-cols-12 gap-5 mt-5 border-b mb-3 p-2 font-bold text-[#9FA2B4]  items-center">
            <div className="col-span-4">Name</div>
            <div className="col-span-3 text-center">Subscription plan</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-1"></div>
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
          </div>)}
          {!loading && data.length > 0 && data?.map(({id,status,email, role, avatar:pic,subscription, first_name, last_name,}, i) => (
            <div
              onClick={() => {
                navigate(`/user/${id}`, {
                  state: {
                    id,
                    image:pic,
                    subscription,
                    first_name,
                    last_name, 
                    role,
                    status,
                    email

                  }
                })
              }}
              key={i}
              className="cursor-pointer grid grid-cols-12 gap-5 border-y py-4 items-center"
            >
              <div className="col-span-4 flex space-x-2 items-center">
                <div className="w-[45px] h-[45px]">
                <img src={pic || avatar} alt="" className="rounded-full w-full h-full" />
                </div>
               
                <div className="flex flex-col">
                  <h1>{`${first_name} ${last_name}` || 'nil'}</h1>
                
                </div>
              </div>
              <div className="col-span-3 text-center">{subscription || 'nil'}</div>
              <div className="col-span-2">
                <div className="bg-[#ECECFE] text-[#514EF3] text-center font-xs px-4 py-2 rounded-[100px]">
                  {status}
                </div>
              </div>
              <div className="col-span-2">{role || 'nil'}</div>
              <div className="col-span-1 relative">
                <button
                  onClick={() => {
                    setAction(id);
                  }}
                  className=""
                >
                  <BsThreeDotsVertical />
                </button>
                {actions && (
                  <div
                    className="fixed inset-0"
                    onClick={() => {
                      setAction(null);
                    }}
                  ></div>
                )}
                {actions && (
                  <div className="z-[99] font-medium absolute right-20 bg-[#f7f7f7] text-base rounded-lg  w-[200px] flex flex-col">
                    <button className="p-4 hover:bg-gray-300">Edit </button>
                    <button className="p-4 hover:bg-gray-300">
                      {" "}
                      Activate{" "}
                    </button>
                    <button className="p-4 hover:bg-gray-300">
                      {" "}
                      Change role
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
  );
}

export default UserManagement;
