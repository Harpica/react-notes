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

const GridView = () => {
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
      <Grid xs={4} sx={{ minWidth: "250px" }}>
        <Card>
          <ListItemButton
            sx={{ height: "300px", textAlign: "start", overflow: "hidden" }}
          >
            Текст заметки Текст заметки Текст заметки Текст заметки Текст
            заметки Текст заметки Текст заметки Текст заметки Текст заметки
            Текст заметки Текст заметки Текст заметки Текст заметки Текст
            заметки Текст заметки Текст заметки заметки Текст заметки Текст
            заметки заметки Текст заметки Текст заметки заметки Текст заметки
            Текст заметки
          </ListItemButton>
        </Card>
        <ListItemText>Время создания</ListItemText>
      </Grid>
      <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid>
      <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid>
      <Grid xs={4} sx={{ bminWidth: "250px", maxHeight: "300px" }}></Grid>
    </Grid>
  );
};

export default GridView;
