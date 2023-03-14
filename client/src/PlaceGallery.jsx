import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  if (showAllPhotos) {
    return (
      <div className=" absolute inset-0 bg-white  min-h-screen">
        <div className=" bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48 text-white">Photo of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" fixed right-8 top-9 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
              Close Photo
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <div>
                  <img
                    className="rounded-2xl object-cover"
                    src={"http://localhost:4000/uploads/" + photo}
                    alt=""
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid ">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className=" aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/" + place.photos?.[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" aspect-square cursor-pointer object-cover relative top-2"
                src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show more photo
      </button>
    </div>
  );
};

export default PlaceGallery;
