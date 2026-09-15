import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import Nav from "../components/Nav";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    setLoading(true);
    setFollowing(false);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((response) => {
        setAuthor(response.data);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleFollow = () => {
    setFollowing((current) => !current);
    setFollowers((current) => (following ? current - 1 : current + 1));
  };

  const renderSkeleton = () => (
    <section aria-label="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <Skeleton width="100px" height="100px" borderRadius="50%" />
                  <div className="profile_name">
                    <Skeleton width="180px" height="24px" borderRadius="4px" />
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <Skeleton width="130px" height="40px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div id="wrapper">
      <Nav />
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {loading ? (
          renderSkeleton()
        ) : (
          <>
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt={author.authorName} />

                          <i className="fa fa-check"></i>

                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.walletAddress}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>

                          <Link
                            to="#"
                            className="btn-main"
                            onClick={(event) => {
                              event.preventDefault();
                              handleFollow();
                            }}
                          >
                            {following ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        items={author.nftCollection}
                        authorImage={author.authorImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;



