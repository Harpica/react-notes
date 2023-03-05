import React, { useEffect, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Note, NoteVM } from "../../viewModels/Note.VM";
import { TextStyle } from "../../viewModels/TopMenu.VM";
import { isCustomEvent, off, on } from "../../utils/events";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";

const style = {
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    p: 2,
    flex: 2,
    overflow: "clip",
  },
};

interface NoteViewProps {
  note: ReactiveState<Note>;
  noteKey: ReactiveState<string>;
}

const NoteView: React.FC<NoteViewProps> = ({ note, noteKey }) => {
  const defaultCurrentNoteValue = useRef(note.get);
  const vm = new NoteVM(note, noteKey, defaultCurrentNoteValue);

  // Every time currentNote changes, we find once again ReactMarkdown element
  useEffect(() => {
    const reactMarkdowm = document.querySelector(
      ".react-markdowm"
    ) as HTMLElement;
    const save = (e: Event) => {
      if (isCustomEvent(e)) {
        vm.saveNoteAfterTextFormat(reactMarkdowm, e.detail.style);
      }
    };
    // Set lisnener to text formatting
    on("test formatting", save);

    return () => {
      off("test formatting", save);
    };
  }, [note.get]);

  return (
    <Box sx={style.box}>
      <Typography>{vm.date}</Typography>

      <h1
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => {
          vm.saveNoteTitle(e.currentTarget.textContent);
        }}
      >
        {defaultCurrentNoteValue.current.title}
      </h1>
      <Box
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => {
          vm.saveNote(
            e.currentTarget.querySelector(".react-markdowm") as HTMLElement,
            TextStyle.NONE
          );
        }}
      >
        {/* You can uncomment below to see markdown changes in real time */}
        {/* <p>{note.get.body}</p> */}
        <ReactMarkdown
          className={"react-markdowm"}
          key={defaultCurrentNoteValue.current.body}
        >
          {defaultCurrentNoteValue.current.body === ""
            ? "Start writting..."
            : defaultCurrentNoteValue.current.body}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

export default React.memo(NoteView);
