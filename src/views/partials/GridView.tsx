import Typography from "@mui/material/Typography";
import { Card, ListItemButton, ListItemText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { Note } from "../../viewModels/Note.VM";
import { NoteListVM } from "../../viewModels/NoteList.VM";

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
        overflowY: "scroll",
      }}
    >
      {vm.notes.get &&
        Array.from(vm.notes.get.keys()).map((key, i) => (
          <Grid key={i + "grid"} xs={4} sx={{ minWidth: "250px" }}>
            <Card>
              <ListItemButton
                sx={{ height: "300px", textAlign: "start", overflow: "hidden" }}
                onClick={() => {
                  vm.setCurrentNote(key);
                }}
              >
                {vm.notes.get?.get(key)?.title}
              </ListItemButton>
            </Card>
            <ListItemText>{}</ListItemText>
          </Grid>
        ))}
    </Grid>
  );
};

export default GridView;
