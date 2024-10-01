import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, value_convertor } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.length > 0 ? (
        apiData.map((item, index) => {
          const { snippet, statistics } = item;
          return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
              <img
                src={snippet.thumbnails.medium.url}
                alt={snippet.title}
              />
              <div className="vid-info">
                <h4>{snippet.title}</h4>
                <p>{snippet.channelTitle}</p>
                <p>{value_convertor(statistics.viewCount)} Views</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Recommended;
