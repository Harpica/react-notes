import { ReactiveState } from "../utils/hooks/useReactive.hook";
import TurndownService from "turndown";

export interface Note {
  title: string;
  body: string;
}

const turndownService = new TurndownService();

export class NoteVM {
  public note: ReactiveState<Note>;
  private title: string;
  private body: string;

  constructor(note: ReactiveState<Note>) {
    this.note = note;
    this.title = this.note.get.title;
    this.body = this.note.get.body;
    // this.saveNote = this.saveNote.bind(this);
  }
  saveNoteTitle(value: string | null) {
    let title = "";
    if (!value) {
      title = "No title";
    } else {
      title = value;
    }
    console.log(this.title);
    this.note.set({ title: title, body: this.note.get.body });
  }
  saveNoteBody(value: string | null) {
    let body = "";
    if (!value) {
      body = "No notes";
    } else {
      body = value;
    }
    this.note.set({ title: this.note.get.title, body: body });
  }

  saveNote(HtmlElement: HTMLElement) {
    let markdown = turndownService.turndown(HtmlElement);
    console.log(markdown);
    markdown = markdown.replaceAll("+$+", "**").replaceAll("****", "");

    console.log("saving", markdown);
    this.note.set({ title: this.note.get.title, body: markdown });
  }
}
