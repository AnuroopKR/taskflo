export type ProjectMemberDTO = {
  id: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
};