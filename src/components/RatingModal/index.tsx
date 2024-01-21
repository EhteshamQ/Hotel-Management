import { Dispatch, FC, SetStateAction } from "react";
import { BsStarFill } from "react-icons/bs";

type Props = {
  open: boolean;
  onClose: () => void;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  reviewText: string;
  setReviewText: Dispatch<SetStateAction<string>>;
  onSubmitReview: () => Promise<void>;
  submittingReview: boolean;
  setSubmittingReview: Dispatch<SetStateAction<boolean>>;
};

const RatingModal: FC<Props> = ({
  open,
  rating,
  setRating,
  onClose,
  reviewText,
  setReviewText,
  onSubmitReview,
  setSubmittingReview,
  submittingReview,
}) => {
  const startValues = [1, 2, 3, 4, 5];
  return (
    <>
      {open ? (
        <div className="fixed z-[60] top-0  left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]" />
      ) : null}
      <div
        className={`fixed z-[65] inset-0 flex items-center justify-center ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl dark:text-gray-800 font-semibold mb-2">
            Rate your Experience
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex items-center">
              {startValues.map((val) => (
                <button
                  className={`w-6 h-6 ${
                    rating >= val ? "text-yellow-300" : "text-gray-900"
                  }`}
                  key={val}
                  onClick={() => {
                    setRating(val);
                  }}
                >
                  <BsStarFill />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 text-black">
            <label
              htmlFor="review-text"
              className="block text-sm font-medium text-gray-700"
            >
              Review Text
            </label>
            <textarea
              id="review-text"
              rows={4}
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              className="w-full px-2 py-3 border rounded-md"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white rounded-md"
              onClick={() => {
                onSubmitReview();
              }}
              disabled={submittingReview}
            >
              {submittingReview ? "Submitting" : "Submit"}
            </button>
            <button
              onClick={() => onClose()}
              className="px-4 py-2 ml-2 bg-gray-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingModal;
