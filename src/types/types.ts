export interface IToDo {
  title: string;
  id: number;
  status: boolean
}

export type ISelectState = 'ALL'|'Complete'|'Incomplete';