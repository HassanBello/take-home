import type { FC } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent, IAgentCta } from "../../types/Agent";
import axios from "axios";

import "./Agents.css";
import Modal from "../Modal/Modal";
import CreateAgent from "./CreateAgentCta";
import ViewAgent from "./ViewAgentCta";
import CustomBtn from "../Button/Button";

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [showModal, setModal] = useState<boolean>(false);
  const [showAgent, setAgentData] = useState<IAgentCta>({
    show: false,
    agent: {} as IAgent,
  });

  async function fetchInitialData() {
    const response = await axios.get("/agents");
    setAgents(response.data);
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleAgentCreation = async (data: IAgent) => {
    try {
      await axios.post("/agent", data);
      fetchInitialData();
      setModal(!showModal);
    } catch (error) {}
  };

  const filterAgent = async (event: any) => {
    if (event.target.value.length > 1) {
      try {
        const response = await axios.get("/agent/area/search", {
          params: { practiceAreas: event.target.value },
        });
        setAgents(response.data);
      } catch (error) {}
    } else {
      fetchInitialData();
    }
  };

  const getAgentDetails = async (agentId: string) => {
    try {
      const response = await axios.get(`/agent/${agentId}`);
      setAgentData({show: true, agent: response.data});
    } catch (error) {}
  }

  const updateReviews = async (payload: {id: string; review: string}) => {
    try {
      await axios.post('/agent/review', payload);
      getAgentDetails(payload.id)
    } catch (error) {}
  }

  return (
    <>
      <div className="flex flex-col p-3">
        <div className="flex justify-center my-2">
          <input
            type="text"
            className="custom-input mx-1 w-1/2"
            placeholder="Search by Location"
            onChange={filterAgent}
          />
        </div>
        <div className="flex justify-center">
          <CustomBtn  click={() => setModal(!showModal)}>
          Join the team
          </CustomBtn>
        </div>
        <div className="agents">
          {agents.map((agent) => (
            <Agent key={agent.id} agent={agent} click={getAgentDetails}  />
          ))}
        </div>
      </div>
      <Modal show={showModal} onClose={() => setModal(!showModal)}>
        <CreateAgent submitAgent={handleAgentCreation} />
      </Modal>
      <Modal
        show={showAgent.show}
        onClose={() => setAgentData({ ...showAgent, show: !showAgent.show })}
      >
        <ViewAgent agent={showAgent.agent} createReview={updateReviews} />
      </Modal>
    </>
  );
};

export default Agents;
