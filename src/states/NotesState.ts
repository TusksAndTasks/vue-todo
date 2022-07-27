import { reactive } from "vue";
import { INote } from "@/types/interfaces";

export const notesState = reactive([] as Array<INote>);
