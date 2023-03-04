import { trigger } from "../utils/events";
import { ReactiveState } from "../utils/hooks/useReactive.hook";
import { AppDisplay } from "./App.VM";
import { Note } from "./Note.VM";

export type TextStyle = "Bold" | "Italic" | "Underlined" | "None";

export class TopMenuVM {
  private appDisplay: ReactiveState<AppDisplay>;
  private isNoteOpen: ReactiveState<boolean>;
  public isMenuOpen: ReactiveState<boolean>;
  private currentNote: ReactiveState<Note>;
  constructor(
    appDisplay: ReactiveState<AppDisplay>,
    isNoteOpen: ReactiveState<boolean>,
    isMenuOpen: ReactiveState<boolean>,
    currentNote: ReactiveState<Note>
  ) {
    this.appDisplay = appDisplay;
    this.isNoteOpen = isNoteOpen;
    this.isMenuOpen = isMenuOpen;
    this.currentNote = currentNote;
  }
  set setDisplay(value: AppDisplay) {
    this.appDisplay.set(value);
    if (value === "Grid") {
      this.isNoteOpen.set(false);
    }
  }
  startNewNote() {
    if (this.appDisplay.get === "Grid") {
      this.appDisplay.set("Hidden");
    }
    this.isNoteOpen.set(true);
    this.currentNote.set({ title: "Title", body: "" });
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
  styleText() {
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
        const indexOfSelectionStart = selection.anchorOffset;
        const indexOfSelectionEnd = selection.focusOffset;

        if (selection.anchorNode === selection.focusNode) {
          console.log("the same nodes");
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
          console.log(newEndValue, focusNodeValue, indexOfSelectionEnd);
        }
      }
    }
    trigger("test formatting");
  }
}
