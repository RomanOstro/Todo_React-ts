export interface IToDo {
  title: string;
  id: number;
  status: boolean
}

export type ISelectState = 'ALL'|'Complete'|'Incomplete';

export type ITheme = 'light' | 'dark';

export interface IThemeContext{
  theme: ITheme;
  changeTheme: ()=> void;
}