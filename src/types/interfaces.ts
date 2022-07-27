export interface INote {
  title: string;
  key: string;
  todos?: Array<ITodo>;
}

export interface ITodo {
  task: string;
  isDone: boolean;
  key: string;
}
