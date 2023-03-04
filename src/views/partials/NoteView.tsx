import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Note, NoteVM } from "../../viewModels/Note.VM";
import React, { useEffect, useRef, useCallback, useReducer } from "react";
import { off, on } from "../../utils/events";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";

interface NoteViewProps {
  note: ReactiveState<Note>;
  noteKey: ReactiveState<string>;
}

const NoteView: React.FC<NoteViewProps> = ({ note, noteKey }) => {
  const defaultCurrentNoteValue = useRef(note.get);
  const vm = new NoteVM(note, noteKey, defaultCurrentNoteValue);

  const saveAndRerender = useCallback(
    (reactMarkdowm: HTMLElement) => {
      vm.saveNote(reactMarkdowm);
      vm.rerenderNote();
    },
    [vm]
  );

  useEffect(() => {
    const reactMarkdowm = document.querySelector(
      ".react-markdowm"
    ) as HTMLElement;
    const save = () => {
      saveAndRerender(reactMarkdowm);
    };

    on("test formatting", save);

    return () => {
      off("test formatting", save);
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
        overflow: "clip",
      }}
    >
      <Typography>{vm.date}</Typography>

      <h1
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => {
          console.log("hi");
          console.log(e.currentTarget);
          vm.saveNoteTitle(e.currentTarget.textContent);
        }}
      >
        {defaultCurrentNoteValue.current.title}
      </h1>
      <p>{vm.currentNote.get.body}</p>
      <Box
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => {
          vm.saveNote(
            e.currentTarget.querySelector(".react-markdowm") as HTMLElement
          );
        }}
      >
        <ReactMarkdown className={"react-markdowm"}>
          {/* {defaultValue.current.body === ""
            ? "Start writting..."
            : defaultValue.current.body} */}
          {/* {vm.currentNote.get.body} */}
          {defaultCurrentNoteValue.current.body}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

export default React.memo(NoteView);
