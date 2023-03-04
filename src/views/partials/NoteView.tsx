import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Note, NoteVM } from "../../viewModels/Note.VM";
import { useEffect, useRef, useCallback } from "react";
import { off, on } from "../../utils/events";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";

interface NoteViewProps {
  note: ReactiveState<Note>;
  noteKey: ReactiveState<string>;
}

const NoteView: React.FC<NoteViewProps> = ({ note, noteKey }) => {
  const vm = new NoteVM(note, noteKey);
  const defaultValue = useRef(vm.currentNote.get);

  useEffect(() => {
    const reactMarkdowm = document.querySelector(
      ".react-markdowm"
    ) as HTMLElement;
    const saveNote = () => {
      vm.saveNote(reactMarkdowm);
    };
    on("test formatting", saveNote);

    return () => {
      off("test formatting", saveNote);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        p: 2,
        flex: 2,
      }}
    >
      <Typography>Дата</Typography>
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => {
          vm.saveNote(
            e.currentTarget.querySelector(".react-markdowm") as HTMLElement
          );
        }}
      >
        <h1
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e) => {
            console.log("hi");
            console.log(e.currentTarget);
            vm.saveNoteTitle(e.currentTarget.textContent);
          }}
        >
          {defaultValue.current.title}
        </h1>
        <p>{vm.currentNote.get.body}</p>

        <ReactMarkdown className={"react-markdowm"}>
          {defaultValue.current.body === ""
            ? "Start writting..."
            : defaultValue.current.body}
        </ReactMarkdown>
      </div>
    </Box>
  );
};

export default NoteView;
