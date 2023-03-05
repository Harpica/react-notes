import { ReactiveState } from "../utils/hooks/useReactive.hook";
import TurndownService from "turndown";
import { TextStyle } from "./TopMenu.VM";

export interface Note {
  title: string;
  body: string;
}

const turndownService = new TurndownService();

const mapToReplaceWith = new Map<TextStyle, string>([
  [TextStyle.BOLD, "**"],
  [TextStyle.ITALIC, "_"],
  [TextStyle.CODE, "`"],
  [TextStyle.NONE, ""],
]);

export class NoteVM {
  public currentNote: ReactiveState<Note>;
  public noteKey: ReactiveState<string>;
  private noteRef: React.MutableRefObject<Note>;
  public date: string;
  private markdown: string;

  constructor(
    note: ReactiveState<Note>,
    noteKey: ReactiveState<string>,
    noteRef: React.MutableRefObject<Note>
  ) {
    this.currentNote = note;
    this.noteKey = noteKey;
    this.noteRef = noteRef;
    this.date = "";
    this.markdown = "";
    this.renderDate();
  }
  saveNoteTitle(value: string | null) {
    let title = "";
    if (!value) {
      title = "No title";
    } else {
      title = value;
    }
    this.currentNote.set({ title: title, body: this.currentNote.get.body });
  }
  saveNoteBody(value: string | null) {
    let body = "";
    if (!value) {
      body = "No notes";
    } else {
      body = value;
    }
    this.currentNote.set({ title: this.currentNote.get.title, body: body });
  }

  saveNote(HtmlElement: HTMLElement, textStyle: TextStyle) {
    let markdown = turndownService.turndown(HtmlElement);
    if (textStyle !== TextStyle.NONE) {
      const replaceValue = mapToReplaceWith.get(textStyle);
      if (replaceValue) {
        markdown = markdown
          .replaceAll("+$+", replaceValue)
          // if there is "****" or the same, we delete this symbols and text loses decoration
          .replaceAll(`${replaceValue + replaceValue}`, "");
      } else {
        console.error("No such textStyle");
      }
    }
    this.markdown = markdown;
    this.currentNote.set({ title: this.currentNote.get.title, body: markdown });
  }
  setCurrentNoteValue() {
    this.noteRef.current = {
      title: this.currentNote.get.title,
      body: this.markdown,
    };
  }
  private renderDate() {
    const date = new Date(parseInt(this.noteKey.get));
    this.date = date.toLocaleString();
  }
}
