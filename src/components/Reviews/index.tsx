import LoadingSpinner from "@/app/(web)/loading";
import { Review } from "@/models/review";
import axios from "axios";
import { FC } from "react";
import { BsStarFill } from "react-icons/bs";
import useSWR from "swr";

const getStarArray = (range: number) => {
  return Array(range).fill(<BsStarFill />);
};

type Props = {
  roomId: string;
};

const Reviews: FC<Props> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR<Review[] | undefined>("room-reviews", fetchRoomReviews);

  if ((!roomReviews && !isLoading) || error) {
    console.log(roomReviews, roomId, isLoading);
    throw new Error("Encountered an issue while data loading");
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {roomReviews!.length > 0
        ? roomReviews?.map((review) => (
            <div
              className="bg-gray-300 dark:bg-gray-800 rounded-sm p-2"
              key={review._id}
            >
              <div className="font-semibold mb-2 flex">
                <p>{review.user.name}</p>
                <div className="ml-4  flex items-center text-tertiary-light text-lg">
                  {getStarArray(review.userRating)}
                </div>
              </div>
              <p>{review.reviewText}</p>
            </div>
          ))
        : null}
    </>
  );
};

export default Reviews;
