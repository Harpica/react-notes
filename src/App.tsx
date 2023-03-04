import "./App.css";
import useReactive from "./utils/hooks/useReactive.hook";
import { Note } from "./viewModels/Note.VM";
import MainPage from "./views/pages/MainPage";
export type Notes = { [key: string]: Note };

function App() {
  const currentNoteKey = useReactive<string>("Date");

  return (
    <>
      <MainPage currentNoteKey={currentNoteKey} key={currentNoteKey.get} />
    </>
  );
}

export default App;
