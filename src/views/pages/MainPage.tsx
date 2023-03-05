import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import TopMenu from "../partials/TopMenu";
import NoteView from "../partials/NoteView";
import NoteListView from "../partials/NoteListView";
import { Note } from "../../viewModels/Note.VM";
import { AppDisplay, MainPageVM } from "../../viewModels/MainPage.VM";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import useReactive, { ReactiveState } from "../../utils/hooks/useReactive.hook";

export type Notes = { [key: string]: Note };

interface MainPageProps {
  currentNoteKey: ReactiveState<string>;
  appDisplay: ReactiveState<AppDisplay>;
}

const MainPage: React.FC<MainPageProps> = ({ currentNoteKey, appDisplay }) => {
  const mediaMobile = useMediaQuery("(max-width:600px)");
  const isNoteOpen = useReactive<boolean>(mediaMobile ? false : true);
  const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
    title: "Title",
    body: "",
  });
  const notes = useReactive<Map<string, Note> | null>(null);
  const noteKeysSorted = useReactive<Array<string>>([]);

  const vm = new MainPageVM(notes, noteKeysSorted);

  useEffect(() => {
    vm.getAllNotes();
    if (mediaMobile && appDisplay.get === "Hidden") {
      isNoteOpen.set(true);
    }
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
          noteKey={currentNoteKey}
          notes={notes}
          noteKeysSorted={noteKeysSorted}
          mediaMobile={mediaMobile}
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
            noteKeysSorted={noteKeysSorted}
            mediaMobile={mediaMobile}
          />

          {isNoteOpen.get && (
            <NoteView note={currentNote} noteKey={currentNoteKey} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
