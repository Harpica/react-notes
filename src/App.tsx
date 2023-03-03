import { Box, CssBaseline } from "@mui/material";
import "./App.css";
import TopMenu from "./views/partials/TopMenu";
import GridView from "./views/partials/GridView";
import useReactive from "./utils/hooks/useReactive.hook";
import { AppDisplay } from "./viewModels/App.VM";
import Sidebar from "./views/partials/Sidebar";
import Note from "./views/partials/Note";
import { TextStyle } from "./viewModels/TopMenu.VM";

function App() {
  const appDisplay = useReactive<AppDisplay>("List");
  const isNoteOpen = useReactive<boolean>(false);
  // isMenuOpen
  const textStyle = useReactive<TextStyle>("None");

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <TopMenu appDisplay={appDisplay} isNoteOpen={isNoteOpen} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          {appDisplay.get === "List" && <Sidebar />}
          {appDisplay.get === "Grid" && <GridView />}

          {isNoteOpen.get && <Note />}
        </Box>
      </Box>
    </>
  );
}

export default App;
