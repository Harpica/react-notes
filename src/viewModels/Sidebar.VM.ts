import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { Note } from "./Note.VM";

export class SidebarVM {
  public notes: ReactiveState<Map<string, Note> | null>;
  private currentNoteKey: ReactiveState<string>;
  constructor(
    notes: ReactiveState<Map<string, Note> | null>,
    currentNoteKey: ReactiveState<string>
  ) {
    this.notes = notes;
    this.currentNoteKey = currentNoteKey;
  }
  setCurrentNote(key: string) {
    this.currentNoteKey.set(key);
  }
}
