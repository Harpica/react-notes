import { AppDisplay } from "./MainPage.VM";
import { Note } from "./Note.VM";
import { trigger } from "../utils/events";
import search from "../utils/search";
import { ReactiveState } from "../utils/hooks/useReactive.hook";

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
  private noteKey: ReactiveState<string>;
  private notes: ReactiveState<Map<string, Note>>;
  private textStyle: TextStyle;
  private noteKeysSorted: ReactiveState<Array<string>>;
  private mediaMobile: boolean;
  constructor(
    appDisplay: ReactiveState<AppDisplay>,
    isNoteOpen: ReactiveState<boolean>,
    isMenuOpen: ReactiveState<boolean>,
    isDeleteModalOpen: ReactiveState<boolean>,
    noteKey: ReactiveState<string>,
    notes: ReactiveState<Map<string, Note>>,
    noteKeysSorted: ReactiveState<Array<string>>,
    mediaMobile: boolean
  ) {
    this.appDisplay = appDisplay;
    this.isNoteOpen = isNoteOpen;
    this.isMenuOpen = isMenuOpen;
    this.isDeleteModalOpen = isDeleteModalOpen;
    this.noteKey = noteKey;
    this.notes = notes;
    this.textStyle = TextStyle.NONE;
    this.noteKeysSorted = noteKeysSorted;
    this.mediaMobile = mediaMobile;
  }
  set setDisplay(value: AppDisplay) {
    this.appDisplay.set(value);
    if (value === "Grid" || this.mediaMobile) {
      this.isNoteOpen.set(false);
    } else {
      this.isNoteOpen.set(true);
    }
  }
  startNewNote() {
    if (this.appDisplay.get === "Grid" || this.mediaMobile) {
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
    this.closeDeleteModal();
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
    const selection = window.getSelection() as Selection;
    // inserting markers (+$+) only if selected nodes have parent - ReactMarkdown
    if (
      selection !== null &&
      selection.anchorNode?.parentElement?.closest(".react-markdown")
    ) {
      if (selection.anchorNode !== null && selection.focusNode !== null) {
        const anchorNodeValue = selection.anchorNode.nodeValue;
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
        } else {
          const newStartValue =
            anchorNodeValue?.slice(0, indexOfSelectionStart) +
            "+$+" +
            anchorNodeValue?.slice(indexOfSelectionStart);
          selection.anchorNode.nodeValue = newStartValue;
          const focusNodeValue = selection.focusNode.nodeValue;
          const newEndValue =
            focusNodeValue?.slice(0, indexOfSelectionEnd) +
            "+$+" +
            focusNodeValue?.slice(indexOfSelectionEnd);
          selection.focusNode.nodeValue = newEndValue;
        }
      }
    }
    // Sending custom event to Note view
    trigger("test formatting", { style: this.textStyle });
  }
  searchNotes(inputValue: string) {
    // Sort by latest Date
    let noteKeys = Array.from(this.notes.get!.keys()).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );

    // If there is empty search - early return
    if (inputValue === "") {
      this.noteKeysSorted.set(noteKeys);
      return;
    }

    const keysAndComparedValues = new Map<string, number>([["", 0]]);

    noteKeys.forEach((key) => {
      keysAndComparedValues.set(key, this.getComparedValue(key, inputValue));
    });

    noteKeys = noteKeys
      .filter((key) => {
        const comparedValue = keysAndComparedValues.get(key);
        if (comparedValue) {
          return comparedValue > 0;
        }
      })
      .sort(
        (a, b) => keysAndComparedValues.get(b)! - keysAndComparedValues.get(a)!
      );

    this.noteKeysSorted.set(noteKeys);
  }
  private getComparedValue(key: string, inputValue: string) {
    if (this.notes.get) {
      const note = this.notes.get.get(key);
      if (note) {
        const textValue = note.body + "" + note.title;
        return search.getCompatedValue(textValue, inputValue);
      }
    }
    return 0;
  }
}
