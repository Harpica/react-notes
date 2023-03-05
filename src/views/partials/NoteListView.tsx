import { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { Note } from "../../viewModels/Note.VM";
import React, { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NoteListVM } from "../../viewModels/NoteList.VM";
import { AppDisplay } from "../../viewModels/MainPage.VM";
import Sidebar from "./Sidebar";
import GridView from "./GridView";

interface NoteListViewProps {
  notes: ReactiveState<Map<string, Note> | null>;
  currentNoteKey: ReactiveState<string>;
  appDisplay: ReactiveState<AppDisplay>;
  isNoteOpen: ReactiveState<boolean>;
}

const NoteListView: React.FC<NoteListViewProps> = ({
  notes,
  currentNoteKey,
  appDisplay,
  isNoteOpen,
}) => {
  const vm = new NoteListVM(notes, currentNoteKey, isNoteOpen, appDisplay);
  return (
    <>
      {appDisplay.get === "List" && <Sidebar vm={vm} />}
      {appDisplay.get === "Grid" && <GridView vm={vm} />}
    </>
  );
};

export default NoteListView;