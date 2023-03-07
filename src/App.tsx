import "./App.css";
import { useEffect } from "react";
import useLocalStorage from "./utils/hooks/useLocalStorage";
import useReactive from "./utils/hooks/useReactive.hook";
import { AppDisplay } from "./viewModels/MainPage.VM";
import { Note } from "./viewModels/Note.VM";
import MainPage from "./views/pages/MainPage";

function App() {
  // If local storage has note(s), key become the latest one,
  // if there is no notes - first note is created
  const currentNoteKey = useReactive<string>(
    (() => {
      const keys = Object.keys(localStorage);
      return keys.length
        ? keys.sort((a, b) => parseInt(b) - parseInt(a))[0]
        : Date.now().toString();
    })()
  );
  const currentNote = useLocalStorage<Note>(currentNoteKey.get, {
    title: "Title",
    body: "",
  });
  const appDisplay = useReactive<AppDisplay>("List");

  useEffect(() => {
    console.log(currentNote.key, currentNoteKey.get);
    if (
      currentNote.key !== undefined &&
      currentNote.key !== currentNoteKey.get
    ) {
      currentNote.setKey(currentNoteKey.get);
      const note = window.localStorage.getItem(currentNoteKey.get);
      if (note) {
        currentNote.set(JSON.parse(note));
        return;
      }
    }
    return;
  }, [currentNoteKey]);

  return (
    <>
      <MainPage
        currentNoteKey={currentNoteKey}
        currentNote={currentNote}
        appDisplay={appDisplay}
        // key={currentNoteKey.get}
      />
    </>
  );
}

export default App;
