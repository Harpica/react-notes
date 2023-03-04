import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { AppDisplay } from "./MainPage.VM";
import { Note } from "./Note.VM";

export class NoteListVM {
  public notes: ReactiveState<Map<string, Note> | null>;
  private currentNoteKey: ReactiveState<string>;
  private isNoteOpen: ReactiveState<boolean>;
  private appDisplay: ReactiveState<AppDisplay>;
  constructor(
    notes: ReactiveState<Map<string, Note> | null>,
    currentNoteKey: ReactiveState<string>,
    isNoteOpen: ReactiveState<boolean>,
    appDisplay: ReactiveState<AppDisplay>
  ) {
    this.notes = notes;
    this.currentNoteKey = currentNoteKey;
    this.isNoteOpen = isNoteOpen;
    this.appDisplay = appDisplay;
  }
  setCurrentNote(key: string) {
    if (this.appDisplay.get === "Grid") {
      this.appDisplay.set("Hidden");
    }
    this.isNoteOpen.set(true);
    this.currentNoteKey.set(key);
  }
  renderDate() {
    const date = new Date(parseInt(this.currentNoteKey.get));
    return date.toLocaleString();
  }
}
