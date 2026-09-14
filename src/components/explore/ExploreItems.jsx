import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import NFTCard from "../NFT/NFTCard";

const EXPLORE_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    setVisibleCount(8);

    const url = filter ? `${EXPLORE_API}?filter=${filter}` : EXPLORE_API;

    axios
      .get(url)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching explore items:", error);
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleCount((currentCount) => currentCount + 4);
  };

  const renderSkeleton = () => (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>

            <div className="de_countdown">
              <Skeleton width="100px" height="20px" borderRadius="4px" />
            </div>

            <div className="nft__item_wrap">
              <Skeleton width="100%" height="300px" borderRadius="8px" />
            </div>

            <div className="nft__item_info">
              <Skeleton width="140px" height="20px" borderRadius="4px" />
              <br />
              <Skeleton width="90px" height="16px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        renderSkeleton()
      ) : (            items.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <NFTCard item={item} />
              </div>
            ))
      )}

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
