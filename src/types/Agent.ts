import { ReactChild } from "react";

export interface IAgent {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  agentLicense: string;
  address: string;
  practiceAreas: string;
  aboutMe: string;
  reviews: string
}

export interface ICreateAgent {
  submitAgent: Function;
  children?: ReactChild;
}

export interface IAgentCta {
  show: boolean;
  agent: IAgent
}