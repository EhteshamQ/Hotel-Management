"use client";

import React, { useState } from "react";
import Search from "../Search";

const PageSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All");

  return (
    <Search
      query={query}
      handleQueryChange={setQuery}
      roomTypeFilter={roomTypeFilter}
      handleRoomTypeChange={setRoomTypeFilter}
    />
  );
};

export default PageSearch;
