import { Box, CssBaseline } from "@mui/material";
import "./App.css";
import TopMenu from "./views/partials/TopMenu";
import GridView from "./views/partials/GridView";
import useReactive from "./utils/hooks/useReactive.hook";
import { AppDisplay, AppVM } from "./viewModels/App.VM";
import Sidebar from "./views/partials/Sidebar";
import NoteView from "./views/partials/NoteView";
import { TextStyle } from "./viewModels/TopMenu.VM";
import useLocalStorage from "./utils/hooks/useLocalStorage";
import { Note } from "./viewModels/Note.VM";

export type Notes = { [key: string]: Note };

function App() {
  const appDisplay = useReactive<AppDisplay>("List");
  const isNoteOpen = useReactive<boolean>(false);
  // isMenuOpen = ///
  const textStyle = useReactive<TextStyle>("None");
  const currentNoteKey = useReactive<string>("Date");
  // const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
  //   title: "Title",
  //   body: "",
  // });
  const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
    title: "Title",
    body: "",
  });
  const notes = useReactive<Map<string, Note> | null>(null);

  const vm = new AppVM(appDisplay, notes);

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
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          {appDisplay.get === "List" && (
            <Sidebar notes={notes} currentNote={currentNote} />
          )}
          {appDisplay.get === "Grid" && (
            <GridView notes={notes} currentNote={currentNote} />
          )}

          {isNoteOpen.get && (
            <NoteView note={currentNote} noteKey={currentNoteKey} />
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
