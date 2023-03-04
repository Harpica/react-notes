import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { Note } from "./Note.VM";

export class SidebarVM {
  // public appDisplay: ReactiveState<AppDisplay>;
  public notes: ReactiveState<Map<string, Note> | null>;
  constructor(
    // appDisplay: ReactiveState<AppDisplay>,
    notes: ReactiveState<Map<string, Note> | null>
  ) {
    // this.appDisplay = appDisplay;
    this.notes = notes;
  }
  // getAllNotes() {

  // }
}
