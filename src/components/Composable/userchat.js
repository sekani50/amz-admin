import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getVideoMetric } from "../../Utils/api";
const UserChart = () => {
  const {token} = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function fetchMetric() {
      await getVideoMetric(token)
      .then((res) => {
        console.log(res)
        const { user_metric} = res.data
        setUsers(user_metric)
        //console.log(users)
       
       
      })
      .catch((err) => {
        console.log(err)
      })

    }
    fetchMetric()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  let options = {
    chart: {
      height: 280,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Total",
        data: users.map((val) => val.total),
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories:users.map((val) => val.registered_date),
    },
  };
  const series = [
    {
      name: "Users",
      data: users.map((val) => val.total),
    },

  ];
  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="320"
      />
    </div>
  );
};

export default UserChart;
