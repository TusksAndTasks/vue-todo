import { ITodo } from "@/types/interfaces";

export type validatedFunction = (() => void) | ((arg: ITodo) => void);
export type validationArgument = string | ITodo;
