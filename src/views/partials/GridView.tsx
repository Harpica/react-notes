import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { Note } from "../../viewModels/Note.VM";

interface GridViewProps {
  notes: ReactiveState<Map<string, Note> | null>;
  currentNote: ReactiveState<Note>;
}

const GridView: React.FC<GridViewProps> = ({ notes, currentNote }) => {
  return (
    <Grid
      container
      spacing={4}
      p={4}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        m: 0,
        backgroundColor: "rgb(193, 193, 193)",
      }}
    >
      {notes.get &&
        Array.from(notes.get.keys()).map((key, i) => (
          <Grid key={i + "grid"} xs={4} sx={{ minWidth: "250px" }}>
            <Card>
              <ListItemButton
                sx={{ height: "300px", textAlign: "start", overflow: "hidden" }}
              >
                {notes.get?.get(key)?.title}
              </ListItemButton>
            </Card>
            <ListItemText>Время создания</ListItemText>
          </Grid>
        ))}
      {/* // <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid>
      // <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid>
      // <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid> */}
    </Grid>
  );
};

export default GridView;
