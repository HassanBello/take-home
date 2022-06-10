import type { FC } from "react";
import { IAgent } from "../../types/Agent";

import "./Agent.css";

const Agent: FC<{ agent: IAgent; click: Function }> = ({ agent, click }) => {
  return (
    <div className="container cursor-pointer" onClick={() => click(agent.id)}>
      <header>
        <div className="avatar-holder">
          <img
            src={
              agent.photoUrl === "" || agent.photoUrl === null
                ? "https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1095249842.jpg"
                : agent.photoUrl
            }
            className="avatar"
            alt={agent.firstName}
          />
        </div>
        <h2 className="agent-name">{agent.firstName + " " + agent.lastName}</h2>
      </header>
      <div className="body">{agent.aboutMe}</div>
      <footer>
        <div className="full-width-flex-box">
          <div className="one-third-flex-box">
            <span>{agent.address}</span>
          </div>
          <div className="one-third-flex-box">
            <span>Areas of Practice: {agent.practiceAreas}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Agent;
