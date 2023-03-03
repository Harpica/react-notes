import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { NoteVM } from "../../viewModels/Note.VM";
import { useEffect, useRef, useCallback } from "react";
import { off, on } from "../../utils/events";

const Note = () => {
  const vm = new NoteVM(
    useLocalStorage("Date", { title: "title", body: "Note *N*" })
  );
  const defaultValue = useRef(vm.note.get);

  useEffect(() => {
    const reactMarkdowm = document.querySelector(
      ".react-markdowm"
    ) as HTMLElement;
    const saveNote = () => {
      vm.saveNote(reactMarkdowm);
    };
    on("test formatting", saveNote);
    console.log("adding listener");
    console.log(saveNote, reactMarkdowm);

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
          onInput={(e) => {
            console.log("hi");
            console.log(e.currentTarget);
            vm.saveNoteTitle(e.currentTarget.textContent);
          }}
        >
          {defaultValue.current.title}
        </h1>
        <p
        // contentEditable="true"
        // onInput={(e) => {
        //   console.log("hi");
        //   console.log(e.currentTarget);
        //   vm.saveNoteBody(e.currentTarget.textContent);
        // }}
        >
          {vm.note.get.body}
        </p>
        <ReactMarkdown className={"react-markdowm"}>
          {defaultValue.current.body}
        </ReactMarkdown>
      </div>
    </Box>
  );
};

export default Note;
