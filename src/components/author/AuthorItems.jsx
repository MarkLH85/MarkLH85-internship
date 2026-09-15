import React from "react";
import NFTCard from "../NFT/NFTCard";

const AuthorItems = ({ items = [], authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 mb30">
              <NFTCard
                item={{
                  ...item,
                  authorImage,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
