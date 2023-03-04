import { ReactiveState } from "../utils/hooks/useReactive.hook";
import TurndownService from "turndown";

export interface Note {
  title: string;
  body: string;
}

const turndownService = new TurndownService();

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

  saveNote(HtmlElement: HTMLElement) {
    let markdown = turndownService.turndown(HtmlElement);
    markdown = markdown.replaceAll("+$+", "**").replaceAll("****", "");
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
