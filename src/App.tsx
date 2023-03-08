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
  const [currentNote, currentNoteKey] = useLocalStorage<Note>(
    (() => {
      const keys = Object.keys(localStorage);
      return keys.length
        ? keys.sort((a, b) => parseInt(b) - parseInt(a))[0]
        : Date.now().toString();
    })(),
    {
      title: "Title",
      body: "",
    }
  );
  const appDisplay = useReactive<AppDisplay>("List");

  return (
    <>
      <MainPage
        currentNoteKey={currentNoteKey}
        currentNote={currentNote}
        appDisplay={appDisplay}
      />
    </>
  );
}

export default App;
