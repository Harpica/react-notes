import { AppDisplay } from "./MainPage.VM";
import { Note } from "./Note.VM";
import { ReactiveState } from "../utils/hooks/useReactive.hook";

export class NoteListVM {
  public notes: ReactiveState<Map<string, Note> | null>;
  private currentNoteKey: ReactiveState<string>;
  private isNoteOpen: ReactiveState<boolean>;
  private appDisplay: ReactiveState<AppDisplay>;
  public noteKeysSorted: ReactiveState<Array<string>>;
  constructor(
    notes: ReactiveState<Map<string, Note> | null>,
    currentNoteKey: ReactiveState<string>,
    isNoteOpen: ReactiveState<boolean>,
    appDisplay: ReactiveState<AppDisplay>,
    noteKeysSorted: ReactiveState<Array<string>>
  ) {
    this.notes = notes;
    this.currentNoteKey = currentNoteKey;
    this.isNoteOpen = isNoteOpen;
    this.appDisplay = appDisplay;
    this.noteKeysSorted = noteKeysSorted;
  }
  setCurrentNote(key: string) {
    if (this.appDisplay.get === "Grid") {
      this.appDisplay.set("Hidden");
    }
    this.isNoteOpen.set(true);
    this.currentNoteKey.set(key);
  }
  renderDate(key: string) {
    const date = new Date(parseInt(key));
    return date.toLocaleString();
  }
}
