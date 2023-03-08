import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NoteListVM } from "../../viewModels/NoteList.VM";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { Note } from "../../viewModels/Note.VM";

const style = {
  box: {
    flexDirection: "column",
    position: "static",
    pt: 2,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRightWidth: "thin",
    height: "100%",
    width: "320px",
    flex: 1,
    backgroundColor: "#1976d217",
  },
  boxMobile: {
    width: "100%",
  },
  list: {
    overflow: "auto",
    maxHeight: "75vh",
  },
  listButton: {
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "flex-start",
    maxHeight: "140px",
  },
  listTitle: {
    fontWeight: "bold",
    color: "#1976d2",
  },
};

interface SidebarProps {
  vm: NoteListVM;
  notes: ReactiveState<Map<string, Note>>;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ vm, notes }) => {
  const mediaMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={mediaMobile ? style.boxMobile : style.box}>
      <Typography>Today</Typography>
      <Divider />
      <List sx={style.list}>
        {vm.notes.get &&
          vm.noteKeysSorted.get.map((key, i) => (
            <ListItem key={i + "note"}>
              <ListItemButton
                divider={true}
                sx={style.listButton}
                onClick={() => {
                  vm.setCurrentNote(key);
                }}
              >
                <ListItemText sx={style.listTitle} disableTypography={true}>
                  {vm.notes.get?.get(key)?.title}
                </ListItemText>
                <ListItemText disableTypography={true}>
                  {vm.renderDate(key)}
                </ListItemText>
                <ListItemText>
                  {vm.notes.get?.get(key) !== undefined && (
                    <ReactMarkdown>
                      {vm.notes.get?.get(key)?.body as string}
                    </ReactMarkdown>
                  )}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
});

export default Sidebar;
