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

  constructor(note: ReactiveState<Note>, noteKey: ReactiveState<string>) {
    this.currentNote = note;
    this.noteKey = noteKey;
    // this.saveNote = this.saveNote.bind(this);
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
    // console.log(markdown);
    markdown = markdown.replaceAll("+$+", "**").replaceAll("****", "");

    // console.log("saving", markdown);
    this.currentNote.set({ title: this.currentNote.get.title, body: markdown });
  }
}
