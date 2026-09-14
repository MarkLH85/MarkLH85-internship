import React from "react";
import { Link } from "react-router-dom";
import NFTCard from "../NFT/NFTCard";

const AuthorItems = ({ items = [], authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <NFTCard
              key={item.id}
              item={{
                ...item,
                authorImage,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
