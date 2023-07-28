import React from "react";

function Inventories({ title, subtitle }) {
  return (
    <div className="rounded-[10px] inventory p-[20px] bg-white">
      <h1 className="text-sm font-light"> {title} </h1>
      <p className="text-lg font-bold"> {subtitle} </p>
    </div>
  );
}

export default Inventories;
