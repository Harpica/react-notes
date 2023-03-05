import { Card, ListItemButton, ListItemText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { NoteListVM } from "../../viewModels/NoteList.VM";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box } from "@mui/system";

const style = {
  box: {
    backgroundColor: "#1976d217",
    width: "100%",
  },
  gridContainer: {
    width: "100%",
    boxSizing: "border-box",
    m: 0,
    mt: 1,
    // height without topbar ang mt
    maxHeight: "calc(100vh - 64px - 8px)",
    overflowY: "auto",
  },
  gridItem: {
    minWidth: "250px",
  },
  listButton: {
    flexDirection: "column",
    height: "300px",
    textAlign: "start",
    overflow: "hidden",
  },
  listTitle: {
    fontWeight: "bold",
    color: "#1976d2",
  },
};

interface GridViewProps {
  vm: NoteListVM;
}

const GridView: React.FC<GridViewProps> = ({ vm }) => {
  return (
    <Box sx={style.box}>
      <Grid container spacing={4} p={4} sx={style.gridContainer}>
        {vm.notes.get &&
          vm.noteKeysSorted.get.map((key, i) => (
            <Grid key={i + "grid"} xs={4} sx={style.gridItem}>
              <Card>
                <ListItemButton
                  sx={style.listButton}
                  onClick={() => {
                    vm.setCurrentNote(key);
                  }}
                >
                  <ListItemText sx={style.listTitle} disableTypography={true}>
                    {vm.notes.get?.get(key)?.title}
                  </ListItemText>
                  <ListItemText>
                    {vm.notes.get?.get(key) !== undefined && (
                      <ReactMarkdown>
                        {vm.notes.get!.get(key)!.body}
                      </ReactMarkdown>
                    )}
                  </ListItemText>
                </ListItemButton>
              </Card>
              <ListItemText>{vm.renderDate(key)}</ListItemText>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default GridView;
