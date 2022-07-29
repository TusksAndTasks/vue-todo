export interface INote {
  title: string;
  id: string;
  todos?: Array<ITodo>;
}

export interface ITodo {
  task: string;
  isDone: boolean;
  id: string;
}

export interface ICheckEvent {
  target: HTMLInputElement;
}
