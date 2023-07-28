import React,{useEffect} from "react";
import Inventories from "../card/inventories";
import UserChart from "../Composable/userchat";
import Inventorychat from "../Composable/inventory";
import User from "../Composable/user";
import Container from "../admincontainer/container";
import { getVideoMetric } from "../../Utils/api";
import { useSelector } from "react-redux";
import { useState } from "react";


function AdminDashboard() {
  const {token} = useSelector((state) => state.user)
  const [videos, setVideos] = useState('')
  const [users, setUsers] = useState('')
  
  useEffect(() => {
    async function fetchMetric() {
      await getVideoMetric(token)
      .then((res) => {
        console.log(res)
        const {videos, users} = res.data
        setVideos(videos)
        const totalArray = users.map((val) => val.total)
        const total  = totalArray.reduce((acc,curr) => acc+curr,0)
        setUsers(total)
      })
      .catch((err) => {
        console.log(err)
      })

    }
    fetchMetric()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Container>
      <div className="w-full h-fit px-2  sm:px-6 bg-white pt-4 sm:pt-16">
        <div className=" mb-10 grid lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 gap-10">
          <Inventories title="Total Sales" subtitle="$2,456" />
          <Inventories title="Total Users" subtitle={users} />
          <Inventories title="Total videos" subtitle={videos} />
          <Inventories title="Total products" subtitle="456" />
        </div>

        <div className="font-bold text-gray-800 text-xl">User Report</div>
        <UserChart  />

        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <div>
            <div className="font-bold text-gray-800 text-xl">PERFORMANCE</div>
            <Inventorychat />
          </div>

          <div className="inventory p-4">
            <h1 className="font-bold text-xl">Percentage increase in users</h1>
            <User />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AdminDashboard;
