import "./App.css";
import useReactive from "./utils/hooks/useReactive.hook";
import { AppDisplay } from "./viewModels/MainPage.VM";
import { Note } from "./viewModels/Note.VM";
import MainPage from "./views/pages/MainPage";
export type Notes = { [key: string]: Note };

function App() {
  // If local storage has note(s), key become the latest one,
  // if there is no notes - first note is created
  const currentNoteKey = useReactive<string>(
    (() => {
      const keys = Object.keys(localStorage);
      return keys.length
        ? keys.sort((a, b) => parseInt(a) - parseInt(b))[0]
        : Date.now().toString();
    })()
  );
  const appDisplay = useReactive<AppDisplay>("List");

  return (
    <>
      <MainPage
        currentNoteKey={currentNoteKey}
        appDisplay={appDisplay}
        key={currentNoteKey.get}
      />
    </>
  );
}

export default App;
