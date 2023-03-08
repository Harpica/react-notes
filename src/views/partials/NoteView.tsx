import React, { useEffect, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Note, NoteVM } from "../../viewModels/Note.VM";
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
  notes: ReactiveState<Map<string, Note>>;
}

const NoteView: React.FC<NoteViewProps> = ({ note, noteKey, notes }) => {
  const defaultCurrentNoteValue = useRef(note.get);
  const vm = new NoteVM(note, noteKey, defaultCurrentNoteValue, notes);

  // Every time currentNote changes, we find once again ReactMarkdown element
  useEffect(() => {
    const reactMarkdowm = document.querySelector(
      ".react-markdown"
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

  useEffect(() => {
    // updating note if current note changed
    const newNote = JSON.parse(
      window.localStorage.getItem(noteKey.get) as string
    );
    if (defaultCurrentNoteValue.current !== newNote) {
      defaultCurrentNoteValue.current = newNote;
    }
  }, [noteKey.get]);

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
            e.currentTarget.querySelector(".react-markdown") as HTMLElement
          );
        }}
      >
        {/* You can uncomment below to see markdown changes in real time */}
        {/* <p>{note.get.body}</p> */}
        <ReactMarkdown
          className={"react-markdown"}
          // key is needed to rerender component when ref is updated
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

export default NoteView;
