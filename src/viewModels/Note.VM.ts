import TurndownService from "turndown";
import { TextStyle } from "./TopMenu.VM";
import { ReactiveState } from "../utils/hooks/useReactive.hook";

export interface Note {
  title: string;
  body: string;
}

// Service to convers html to markdown
const turndownService = new TurndownService();

// Map for replacing custom markers(+$+) for markdown markers (bold, italic..)
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
  private notes: ReactiveState<Map<string, Note>>;

  constructor(
    note: ReactiveState<Note>,
    noteKey: ReactiveState<string>,
    noteRef: React.MutableRefObject<Note>,
    notes: ReactiveState<Map<string, Note>>
  ) {
    this.notes = notes;
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
    this.updateNoteMap(title, this.currentNote.get.body);
  }

  saveNoteAfterTextFormat(reactMarkdowm: HTMLElement, textStyle: TextStyle) {
    this.saveNote(reactMarkdowm, textStyle);
    this.setCurrentNoteValue();
  }
  saveNote(HtmlElement: HTMLElement, textStyle?: TextStyle) {
    this.setMarkdown(HtmlElement);
    if (textStyle) {
      this.formatText(textStyle);
    }

    this.currentNote.set({
      title: this.currentNote.get.title,
      body: this.markdown,
    });
    this.updateNoteMap(this.currentNote.get.title, this.markdown);
  }
  private updateNoteMap(title: string, body: string) {
    const notes = this.notes.get;
    notes?.set(this.noteKey.get, {
      title: title,
      body: body,
    });
    this.notes.set(notes);
  }
  private setMarkdown(HtmlElement: HTMLElement) {
    this.markdown = turndownService.turndown(HtmlElement);
  }
  private setCurrentNoteValue() {
    this.noteRef.current = {
      title: this.currentNote.get.title,
      body: this.markdown,
    };
  }
  private formatText(textStyle: TextStyle) {
    if (textStyle !== TextStyle.NONE) {
      const replaceValue = mapToReplaceWith.get(textStyle);
      if (replaceValue) {
        this.markdown = this.markdown
          .replaceAll("+$+", replaceValue)
          // if there is "****" or the same, we delete this symbols and text loses decoration
          .replaceAll(`${replaceValue + replaceValue}`, "");
      }
    } else {
      console.error("No such textStyle");
    }
  }
  private renderDate() {
    const date = new Date(parseInt(this.noteKey.get));
    this.date = date.toLocaleString();
  }
}
