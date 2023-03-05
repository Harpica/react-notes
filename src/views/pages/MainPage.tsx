import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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
  const isNoteOpen = useReactive<boolean>(true);
  const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
    title: "Title",
    body: "",
  });
  const notes = useReactive<Map<string, Note> | null>(null);
  const noteKeysSorted = useReactive<Array<string>>([]);

  const vm = new MainPageVM(notes, noteKeysSorted);

  useEffect(() => {
    vm.getAllNotes();
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
