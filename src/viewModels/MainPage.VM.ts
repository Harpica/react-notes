import { Note } from "./Note.VM";
import { ReactiveState } from "../utils/hooks/useReactive.hook";

export type AppDisplay = "List" | "Grid" | "Hidden";

export class MainPageVM {
  // private notes: ReactiveState<Map<string, Note> | null>;
  // private noteKeysSorted: ReactiveState<Array<string>>;

  constructor() // notes: ReactiveState<Map<string, Note> | null>,
  // noteKeysSorted: ReactiveState<Array<string>>
  {
    // this.notes = notes;
    // this.noteKeysSorted = noteKeysSorted;
  }
  // getAllNotes() {
  //   if (this.notes.get === null || this.notes.get.size === 0) {
  //     const keys = Object.keys(localStorage);
  //     let notes = new Map<string, Note>();
  //     for (let i = 0; i < keys.length; i++) {
  //       notes.set(
  //         keys[i],
  //         JSON.parse(window.localStorage.getItem(keys[i]) as string)
  //       );
  //     }
  //     this.setNoteKeys(notes);
  //    return this.notes.set(notes);
  //   }
  // }
  getAllNotes() {
    const keys = Object.keys(localStorage);
    let notes = new Map<string, Note>();
    for (let i = 0; i < keys.length; i++) {
      notes.set(
        keys[i],
        JSON.parse(window.localStorage.getItem(keys[i]) as string)
      );
    }
    // this.setNoteKeys(notes);
    return notes;
  }

  // setNoteKeys(notes: Map<string, Note>) {
  //   this.noteKeysSorted.set(
  //     Array.from(notes.keys()).sort((a, b) => parseInt(b) - parseInt(a))
  //   );
  // }
  setNoteKeys(notes: Map<string, Note>) {
    return Array.from(notes.keys()).sort((a, b) => parseInt(b) - parseInt(a));
  }
}
