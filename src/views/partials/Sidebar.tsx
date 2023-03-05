import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NoteListVM } from "../../viewModels/NoteList.VM";

interface SidebarProps {
  vm: NoteListVM;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ vm }) => {
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
      <List sx={{ overflow: "auto", maxHeight: "75vh" }}>
        {vm.notes.get &&
          vm.noteKeysSorted.get.map((key, i) => (
            <ListItem key={i + "note"}>
              <ListItemButton
                divider={true}
                sx={{
                  flexDirection: "column",
                  overflow: "hidden",
                  alignItems: "flex-start",
                  maxHeight: "140px",
                }}
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
