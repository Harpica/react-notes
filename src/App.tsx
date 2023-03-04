import "./App.css";
import useReactive from "./utils/hooks/useReactive.hook";
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

  return (
    <>
      <MainPage currentNoteKey={currentNoteKey} key={currentNoteKey.get} />
    </>
  );
}

export default App;
