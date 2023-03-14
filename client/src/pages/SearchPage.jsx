import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrNotification from "../ErrNotification";
import PlaceImg from "../PlaceImg";
import { UserContext } from "../UserContext";

const SearchPage = () => {
  const { searchInfo, setSearchInfo } = useContext(UserContext);

  console.log(searchInfo);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .post("/search", { searchInfo })
      .then(({ data }) => setSearchResults(data));
  }, [searchInfo]);

  // setTimeout(() => {
  //   setSearchInfo('')
  // }, 10000);

  return searchInfo === null || searchInfo === "" ? (
    <ErrNotification
      srcImg={
        "https://wizzy.ai/blog/wp-content/uploads/2020/10/No-Result-Found-1024x604.jpg"
      }
      info={"Fill the search bar to searching place!"}
    />
  ) : searchResults?.length > 0 ? (
    <div to className="mt-8">
      {searchResults.map((place) => (
        <Link to={'/place/'+ place._id} className="lg:mx-64 flex items-center my-3 bg-gray-200 p-2 rounded-2xl ">
          <div className=" mr-4 flex w-36 h-36 bg-gray-300 rounded-2xl shrink-0">
            {place.photos.length > 0 && <PlaceImg place={place} />}
          </div>
          <div className="grow-0 shrink">
            <h2 className="text-xl font-semibold border-b border-gray-400 my-2 pb-2">
              {place.title}
            </h2>
            <p className="text-sm mt-2">{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <ErrNotification
      srcImg={
        "https://wizzy.ai/blog/wp-content/uploads/2020/10/No-Result-Found-Accept.jpg"
      }
      info={"Can't find your place! Check the name of place again!"}
    />
  );
};

export default SearchPage;
