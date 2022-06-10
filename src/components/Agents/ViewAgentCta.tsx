import { FC, useState } from "react";
import { IAgent } from "../../types/Agent";
import CustomBtn from "../Button/Button";

const ViewAgent: FC<{ agent: IAgent; createReview: Function }> = ({
  agent,
  createReview,
}) => {
  let reviews: string[] = JSON.parse(agent.reviews);
  const [reviewData, setReviews] = useState<string>("");

  return (
    <div className="flex flex-row max-w-[700px]">
      <div className="flex flex-col w-6/12">
        <div className="flex flex-row my-2">
          <div className="flex flex-col w-1/2 mx-1">
            <p className="text-base mb-1">First Name</p>
            <input className="custom-input" value={agent.firstName} disabled />
          </div>
          <div className="flex flex-col w-1/2 mx-1">
            <p className="text-base mb-1">Last Name</p>
            <input className="custom-input" value={agent.lastName} disabled />
          </div>
        </div>
        <div className="flex flex-col my-2 mx-1">
          <p className="text-base mb-1">Agent License</p>
          <input className="custom-input" value={agent.agentLicense} disabled />
        </div>
        <div className="flex flex-col my-2 mx-1">
          <p className="text-base mb-1">Address</p>
          <input className="custom-input" value={agent.address} disabled />
        </div>
        <div className="flex flex-col my-2 mx-1">
          <p className="text-base mb-1">Practice Areas</p>
          <input
            className="custom-input"
            value={agent.practiceAreas}
            disabled
          />
        </div>
        <div className="flex flex-col my-2 mx-1">
          <p className="text-base mb-1">About</p>
          <div className="custom-input max-h-[200px] overflow-y-scroll">
            {agent.aboutMe}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-6/12 p-2">
        <div className="flex justify-center">
          {" "}
          <img
            src={
              agent.photoUrl === "" || agent.photoUrl === null
                ? "https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1095249842.jpg"
                : agent.photoUrl
            }
            alt={agent.firstName}
            className="w-[128px] h-[128px] rounded-[50%]"
          />
        </div>
        <p className="text-xl">Reviews</p>
        <div className="max-h-[300px] overflow-y-scroll">
          {reviews &&
            reviews.map((review, index) => (
              <div className="text-base flex flex-row" key={index + 1}>
                <p className="h-full">{index + 1}.</p> <p>{review}</p>
              </div>
            ))}
        </div>
        <textarea
          className="custom-input my-2"
          value={reviewData}
          onChange={(e) => setReviews(e.target.value)}
          cols={30}
          rows={4}
        ></textarea>
        <CustomBtn
          click={() => createReview({ id: agent.id, review: reviewData })}
        >
          Create Review
        </CustomBtn>
      </div>
    </div>
  );
};

export default ViewAgent;
