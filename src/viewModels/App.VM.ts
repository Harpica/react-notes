import { Notes } from "../App";
import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { Note } from "./Note.VM";

export type AppDisplay = "List" | "Grid" | "Hidden";

export class AppVM {
  public appDisplay: ReactiveState<AppDisplay>;
  public notes: ReactiveState<Map<string, Note> | null>;
  constructor(
    appDisplay: ReactiveState<AppDisplay>,
    notes: ReactiveState<Map<string, Note> | null>
  ) {
    this.appDisplay = appDisplay;
    this.notes = notes;
    this.getAllNotes();
  }
  getAllNotes() {
    if (this.notes.get === null) {
      const keys = Object.keys(localStorage);
      let notes = new Map<string, Note>();
      for (let i = 0; i < keys.length; i++) {
        notes.set(
          keys[i],
          JSON.parse(window.localStorage.getItem(keys[i]) as string)
        );
      }
      this.notes.set(notes);
    } else {
      console.log(this.notes, Array.from(this.notes.get.keys()));
      const keys = Array.from(this.notes.get.keys());
      console.log(this.notes.get?.get(keys[0])?.title);
    }
  }
}