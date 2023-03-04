import { TextStyle } from "../../viewModels/TopMenu.VM";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Note } from "../../viewModels/Note.VM";
import { useEffect, useRef } from "react";
import useReactive, { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { AppDisplay, MainPageVM } from "../../viewModels/MainPage.VM";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TopMenu from "../partials/TopMenu";
import Sidebar from "../partials/Sidebar";
import GridView from "../partials/GridView";
import NoteView from "../partials/NoteView";
import NoteListView from "../partials/NoteListView";

export type Notes = { [key: string]: Note };

interface MainPageProps {
  currentNoteKey: ReactiveState<string>;
  appDisplay: ReactiveState<AppDisplay>;
}

const MainPage: React.FC<MainPageProps> = ({ currentNoteKey, appDisplay }) => {
  const isNoteOpen = useReactive<boolean>(true);
  // isMenuOpen = ///
  const textStyle = useReactive<TextStyle>("None");
  const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
    title: "Title",
    body: "",
  });
  // const defaultCurrentNoteValue = useRef(currentNote.get);
  const notes = useReactive<Map<string, Note> | null>(null);

  const vm = new MainPageVM(appDisplay, notes);

  useEffect(() => {
    console.log("I render");
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <TopMenu
          appDisplay={appDisplay}
          isNoteOpen={isNoteOpen}
          currentNote={currentNote}
          noteKey={currentNoteKey}
          notes={notes}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            // backgroundColor: "rgb(193, 193, 193)",
          }}
        >
          <NoteListView
            appDisplay={appDisplay}
            currentNoteKey={currentNoteKey}
            notes={notes}
            isNoteOpen={isNoteOpen}
          />

          {isNoteOpen.get && (
            <NoteView
              note={currentNote}
              noteKey={currentNoteKey}
              // defaultCurrentNoteValue={defaultCurrentNoteValue}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
