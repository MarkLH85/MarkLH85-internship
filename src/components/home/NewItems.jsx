import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";
import NFTCard from "../NFT/NFTCard";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(max-width: 767px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 575px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderSkeleton = () => (
    <div ref={sliderRef} className="keen-slider">
      {new Array(4).fill(0).map((_, index) => (
        <div className="keen-slider__slide" key={index}>
          <div className="nft">
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
        </div>
      ))}
    </div>
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loading ? (
          renderSkeleton()
        ) : (
          <>
            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div className="keen-slider__slide" key={item.id}>
                  <NFTCard item={item} />
                </div>
              ))}
            </div>

            <div className="text-center" style={{ marginTop: "30px" }}>
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewItems;
