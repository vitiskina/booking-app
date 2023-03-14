import React from "react";

const ErrNotification = ({ info, srcImg = null, detailInfo = null }) => {
  return (
    <div className="flex flex-col min-w-full flex-1 justify-center items-center ">
      {srcImg && <img className="h-64 w-auto mb-6" src={srcImg} />}
      <h1 className="font-bold">{info}</h1>
    </div>
  );
};

export default ErrNotification;
