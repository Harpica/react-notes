import { AppDisplay } from "./MainPage.VM";
import { Note } from "./Note.VM";
import { ReactiveState } from "../utils/hooks/useReactive.hook";

export class NoteListVM {
  public notes: ReactiveState<Map<string, Note>>;
  public currentNoteKey: ReactiveState<string>;
  private isNoteOpen: ReactiveState<boolean>;
  private appDisplay: ReactiveState<AppDisplay>;
  public noteKeysSorted: ReactiveState<Array<string>>;
  private mediaMobile: boolean;
  constructor(
    notes: ReactiveState<Map<string, Note>>,
    currentNoteKey: ReactiveState<string>,
    isNoteOpen: ReactiveState<boolean>,
    appDisplay: ReactiveState<AppDisplay>,
    noteKeysSorted: ReactiveState<Array<string>>,
    mediaMobile: boolean
  ) {
    this.notes = notes;
    this.currentNoteKey = currentNoteKey;
    this.isNoteOpen = isNoteOpen;
    this.appDisplay = appDisplay;
    this.noteKeysSorted = noteKeysSorted;
    this.mediaMobile = mediaMobile;
  }
  setCurrentNote(key: string) {
    if (this.appDisplay.get === "Grid" || this.mediaMobile) {
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
