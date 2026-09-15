import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1199px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(max-width: 991px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 767px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },  });

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hot collections:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderSkeleton = () => (
    <div ref={sliderRef} className="keen-slider">
      {new Array(4).fill(0).map((_, index) => (
        <div className="keen-slider__slide" key={index}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Skeleton width="100%" height="300px" borderRadius="8px" />
            </div>

            <div className="nft_coll_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>

            <div className="nft_coll_info">
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <br />
              <Skeleton width="70px" height="16px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center" data-aos="fade-up"><h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loading ? (
          renderSkeleton()
        ) : (
          <>
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div className="keen-slider__slide" key={collection.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hot-collections-controls">
              <button
                type="button"
                className="hot-collections-prev" onClick={() => instanceRef.current?.prev()}
              >
                <i className="fa fa-chevron-left"></i>
              </button>

              <button
                type="button"
                className="hot-collections-next" onClick={() => instanceRef.current?.next()}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HotCollections;






