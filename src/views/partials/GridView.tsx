import { Card, ListItemButton, ListItemText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { NoteListVM } from "../../viewModels/NoteList.VM";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface GridViewProps {
  vm: NoteListVM;
}

const GridView: React.FC<GridViewProps> = ({ vm }) => {
  return (
    <Grid
      container
      spacing={4}
      p={4}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        m: 0,
        mt: 1,
        // height without topbar ang mt
        maxHeight: "calc(100vh - 64px - 8px)",
        overflowY: "auto",
      }}
    >
      {vm.notes.get &&
        vm.noteKeysSorted.get.map((key, i) => (
          <Grid key={i + "grid"} xs={4} sx={{ minWidth: "250px" }}>
            <Card>
              <ListItemButton
                sx={{
                  flexDirection: "column",
                  height: "300px",
                  textAlign: "start",
                  overflow: "hidden",
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
            </Card>
            <ListItemText>{vm.renderDate(key)}</ListItemText>
          </Grid>
        ))}
    </Grid>
  );
};

export default GridView;
