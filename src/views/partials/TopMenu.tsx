import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, ButtonGroup } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { TopMenuVM } from "../../viewModels/TopMenu.VM";
import useReactive, { ReactiveState } from "../../utils/hooks/useReactive.hook";
import { AppDisplay } from "../../viewModels/App.VM";
import useLocalStorage from "../../utils/hooks/useLocalStorage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
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
}

const TopMenu: React.FC<TopMenuProps> = ({ appDisplay, isNoteOpen }) => {
  const isMenuOpen = useReactive(false);
  const vm = new TopMenuVM(
    appDisplay,
    isNoteOpen,
    isMenuOpen,
    useLocalStorage("Date", { title: "title", body: "Note *N*" })
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", width: "100%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            onClick={() => {
              vm.setDisplay = "List";
            }}
          >
            List
          </Button>
          <Button
            onClick={() => {
              vm.setDisplay = "Grid";
            }}
          >
            Grid
          </Button>
        </ButtonGroup>
        <Button variant="text">Delete</Button>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            onClick={() => {
              vm.startNewNote();
            }}
          >
            New
          </Button>
          <Button className="menu-button" onClick={() => vm.openMenu()}>
            Edit
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
              onClick={() => {
                console.log(window.getSelection());
                vm.styleText();
                vm.closeMenu();
              }}
            >
              Bold
            </MenuItem>
            <MenuItem
              onClick={() => {
                vm.closeMenu();
              }}
            >
              Italic
            </MenuItem>
            <MenuItem
              onClick={() => {
                vm.closeMenu();
              }}
            >
              Underlined
            </MenuItem>
          </Menu>
        </ButtonGroup>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
