import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ErrNotification from "../ErrNotification";
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
    searchResults.map((place) => (
      <div className="flex mt-4 bg-gray-200 p-2 rounded-2xl ">
        <div>
          <img src="" />
        </div>
        <div>
          {" "}
          <h1>{place.title}</h1>
        </div>
      </div>
    ))
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
