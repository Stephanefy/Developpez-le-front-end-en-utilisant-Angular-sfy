// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { IParticipation } from "./Participation";

export interface IOlympic {
  id: number;
  country: string;
  participations: IParticipation[];
}
