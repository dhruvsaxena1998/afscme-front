export interface ILeads {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  affiliation: string;
  role: "user";
  status: "pending" | "approved" | "rejected";
}

export type ICreateLeadDTO = Omit<ILeads, "id">;
