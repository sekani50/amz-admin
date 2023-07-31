import React,{useState, useEffect} from "react";
import Chart from "react-apexcharts";
import { getVideoMetric } from "../../Utils/api";
import { useSelector } from "react-redux";
const CircularChart = () => {
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
  var options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
      },
    },
    labels: users.map((val) => val.registered_date),
  };

  const series = users?.map((val) => val.total);
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        width="99%"
        height="350"
      />
    </div>
  );
};

export default CircularChart;
