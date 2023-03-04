import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Notes } from "../../App";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { Note } from "../../viewModels/Note.VM";
import { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { SidebarVM } from "../../viewModels/Sidebar.VM";

interface SidebarProps {
  notes: ReactiveState<Map<string, Note> | null>;
  currentNote: ReactiveState<Note>;
  currentNoteKey: ReactiveState<string>;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  currentNote,
  currentNoteKey,
}) => {
  const vm = new SidebarVM(notes, currentNoteKey);

  return (
    <Box
      sx={{
        flexDirection: "column",
        position: "static",
        pt: 2,
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
        borderRightWidth: "thin",
        height: "100%",
        maxWidth: "320px",
        flex: 1,
      }}
    >
      <Typography>Сегодня</Typography>
      <Divider />
      <List>
        {notes.get &&
          Array.from(notes.get.keys())
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((key, i) => (
              <ListItem key={i + "note"}>
                <ListItemButton
                  sx={{ flexDirection: "column" }}
                  onClick={() => {
                    vm.setCurrentNote(key);
                    console.log(key);
                  }}
                >
                  <ListItemText>{notes.get?.get(key)?.title}</ListItemText>
                  <ListItemText>
                    {notes.get?.get(key) !== undefined && (
                      <ReactMarkdown>
                        {notes.get?.get(key)?.body as string}
                      </ReactMarkdown>
                    )}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </Box>
  );
};

export default Sidebar;
