"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

type SearchProps = {
  roomTypeFilter: string;
  handleRoomTypeChange: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  handleQueryChange: React.Dispatch<React.SetStateAction<string>>;
};

const Search: FC<SearchProps> = ({
  handleQueryChange,
  handleRoomTypeChange,
  query,
  roomTypeFilter,
}) => {
  const router = useRouter();
  const handleApplyFilters = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${query}`);
  };

  return (
    <section className="bg-tertiary-light px-4 py-6 rounded-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-block">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomTypeFilter}
              onChange={(e) => handleRoomTypeChange(e.target.value)}
              className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxuary">Luxuary</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Search
          </label>
          <input
            type="search"
            id="search"
            placeholder="Search.."
            className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black  dark:placeholder:text-white"
            onChange={(e) => handleQueryChange(e.target.value)}
            value={query}
          />
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={handleApplyFilters}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
