import React from "react";
import PopularSearch from "../../components/PopularSearch";
import TopPosts from "../../components/TopPosts";

export default function Home() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "24px" }}>
        <TopPosts />
        <PopularSearch />
      </div>
    </>
  );
}
