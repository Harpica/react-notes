import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, ButtonGroup } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { TextStyle, TopMenuVM } from "../../viewModels/TopMenu.VM";
import DeleteModal from "./Modal";
import { AppDisplay } from "../../viewModels/MainPage.VM";
import { Note } from "../../viewModels/Note.VM";
import useReactive, { ReactiveState } from "../../utils/hooks/useReactive.hook";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "initial",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: "black",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface TopMenuProps {
  appDisplay: ReactiveState<AppDisplay>;
  isNoteOpen: ReactiveState<boolean>;
  noteKey: ReactiveState<string>;
  notes: ReactiveState<Map<string, Note>>;
  noteKeysSorted: ReactiveState<Array<string>>;
  mediaMobile: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({
  appDisplay,
  isNoteOpen,
  noteKey,
  notes,
  noteKeysSorted,
  mediaMobile,
}) => {
  const isMenuOpen = useReactive(false);
  const isDeleteModalOpen = useReactive(false);

  const vm = new TopMenuVM(
    appDisplay,
    isNoteOpen,
    isMenuOpen,
    isDeleteModalOpen,
    noteKey,
    notes,
    noteKeysSorted,
    mediaMobile
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", width: "100%" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <ButtonGroup variant="text" aria-label="list and grid view of notes">
            <Button
              onClick={() => {
                vm.setDisplay = "List";
              }}
            >
              <ViewListIcon />
            </Button>
            <Button
              onClick={() => {
                vm.setDisplay = "Grid";
              }}
            >
              <GridViewIcon />
            </Button>
          </ButtonGroup>
          <Button
            variant="text"
            onClick={() => {
              vm.openDeleteModal();
            }}
          >
            <DeleteIcon />
          </Button>
          <ButtonGroup variant="text" aria-label="add and edit note">
            <Button
              onClick={() => {
                vm.startNewNote();
              }}
            >
              <NoteAddIcon />
            </Button>
            <Button className="menu-button" onClick={() => vm.openMenu()}>
              <FormatColorTextIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={vm.getMenuAnchorEl()}
              open={vm.isMenuOpen.get}
              onClose={() => {
                vm.closeMenu();
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(e) => {
                  vm.handleStyleButtonClick(TextStyle.BOLD);
                }}
              >
                Bold
              </MenuItem>
              <MenuItem
                onClick={() => {
                  vm.handleStyleButtonClick(TextStyle.ITALIC);
                }}
              >
                Italic
              </MenuItem>
              <MenuItem
                onClick={() => {
                  vm.handleStyleButtonClick(TextStyle.CODE);
                }}
              >
                Code
              </MenuItem>
            </Menu>
          </ButtonGroup>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                vm.searchNotes(e.currentTarget.value);
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <DeleteModal vm={vm} />
    </>
  );
};

export default TopMenu;
