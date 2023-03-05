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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NoteListVM } from "../../viewModels/NoteList.VM";

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
    maxWidth: "320px",
    flex: 1,
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
};

interface SidebarProps {
  vm: NoteListVM;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ vm }) => {
  return (
    <Box sx={style.box}>
      <Typography>Сегодня</Typography>
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
                <ListItemText>{vm.notes.get?.get(key)?.title}</ListItemText>
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
