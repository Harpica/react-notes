import { trigger } from "../utils/events";
import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { AppDisplay } from "./MainPage.VM";
import { Note } from "./Note.VM";

export enum TextStyle {
  BOLD = "Bold",
  ITALIC = "Italic",
  CODE = "Code",
  NONE = "None",
}

export class TopMenuVM {
  private appDisplay: ReactiveState<AppDisplay>;
  private isNoteOpen: ReactiveState<boolean>;
  public isMenuOpen: ReactiveState<boolean>;
  public isDeleteModalOpen: ReactiveState<boolean>;
  private currentNote: ReactiveState<Note>;
  private noteKey: ReactiveState<string>;
  private notes: ReactiveState<Map<string, Note> | null>;
  private textStyle: TextStyle;
  constructor(
    appDisplay: ReactiveState<AppDisplay>,
    isNoteOpen: ReactiveState<boolean>,
    isMenuOpen: ReactiveState<boolean>,
    isDeleteModalOpen: ReactiveState<boolean>,
    currentNote: ReactiveState<Note>,
    noteKey: ReactiveState<string>,
    notes: ReactiveState<Map<string, Note> | null>
  ) {
    this.appDisplay = appDisplay;
    this.isNoteOpen = isNoteOpen;
    this.isMenuOpen = isMenuOpen;
    this.isDeleteModalOpen = isDeleteModalOpen;
    this.currentNote = currentNote;
    this.noteKey = noteKey;
    this.notes = notes;
    this.textStyle = TextStyle.NONE;
  }
  set setDisplay(value: AppDisplay) {
    this.appDisplay.set(value);
    if (value === "Grid") {
      this.isNoteOpen.set(false);
    } else {
      this.isNoteOpen.set(true);
    }
  }
  startNewNote() {
    if (this.appDisplay.get === "Grid") {
      this.appDisplay.set("Hidden");
    }
    this.isNoteOpen.set(true);
    const date = Date.now().toString();
    this.noteKey.set(date);
    if (this.notes.get) {
      this.notes.set(this.notes.get.set(date, { title: "Title", body: "" }));
    }
  }
  deleteNote() {
    if (this.notes.get) {
      let notes = this.notes.get;
      notes.delete(this.noteKey.get);
      this.notes.set(notes);
    }
    window.localStorage.removeItem(this.noteKey.get);
    this.noteKey.set(
      (() => {
        const keys = Object.keys(localStorage);
        return keys.length
          ? keys.sort((a, b) => parseInt(b) - parseInt(a))[0]
          : Date.now().toString();
      })()
    );
  }
  getMenuAnchorEl() {
    return document.querySelector(".menu-button");
  }
  openMenu() {
    this.isMenuOpen.set(true);
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }
  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }

  handleStyleButtonClick(textStyle: TextStyle) {
    this.textStyle = textStyle;
    this.styleText();
    this.closeMenu();
  }
  private styleText() {
    if (window.getSelection() !== null) {
      const selection = window.getSelection() as Selection;
      if (selection.anchorNode !== null && selection.focusNode !== null) {
        console.log(
          "start",
          selection.anchorOffset,
          "end",
          selection.focusOffset
        );
        const anchorNodeValue = selection.anchorNode.nodeValue;
        console.log(anchorNodeValue);
        const indexOfSelectionStart = selection.anchorOffset;
        const indexOfSelectionEnd = selection.focusOffset;

        if (selection.anchorNode === selection.focusNode) {
          let start = indexOfSelectionStart;
          let end = indexOfSelectionEnd;
          if (indexOfSelectionEnd < indexOfSelectionStart) {
            end = indexOfSelectionStart;
            start = indexOfSelectionEnd;
          }
          const newValue =
            anchorNodeValue?.slice(0, start) +
            "+$+" +
            anchorNodeValue?.slice(start, end) +
            "+$+" +
            anchorNodeValue?.slice(end);
          selection.anchorNode.nodeValue = newValue;
          console.log(
            "the same nodes, new value",
            selection.anchorNode.nodeValue
          );
        } else {
          const newStartValue =
            anchorNodeValue?.slice(0, indexOfSelectionStart) +
            "+$+" +
            anchorNodeValue?.slice(indexOfSelectionStart);
          selection.anchorNode.nodeValue = newStartValue;
          console.log(newStartValue);
          const focusNodeValue = selection.focusNode.nodeValue;
          const newEndValue =
            focusNodeValue?.slice(0, indexOfSelectionEnd) +
            "+$+" +
            focusNodeValue?.slice(indexOfSelectionEnd);
          selection.focusNode.nodeValue = newEndValue;
          console.log(selection.anchorNode.nodeValue);
        }
      }
    }
    trigger("test formatting", { style: this.textStyle });
  }
}
