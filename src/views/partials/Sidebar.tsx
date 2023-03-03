import {
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Sidebar = () => {
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
      }}
    >
      <Typography>Сегодня</Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText>Первая заметка</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
