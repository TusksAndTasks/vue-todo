import { reactive } from "vue";
import { INote } from "@/types/interfaces";

export const notesState = reactive({
  notes: localStorage.getItem("notesState")
    ? (JSON.parse(
        localStorage.getItem("notesState") as string
      ) as unknown as Array<INote>)
    : ([] as Array<INote>),
});
