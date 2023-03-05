import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TopMenuVM } from "../../viewModels/TopMenu.VM";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  vm: TopMenuVM;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ vm }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={vm.isDeleteModalOpen.get}
      onClose={() => {
        vm.closeDeleteModal();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={vm.isDeleteModalOpen.get}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Do you want to delete current note?
          </Typography>
          <ButtonGroup
            variant="text"
            aria-label="delete note group"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                vm.deleteNote();
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                vm.closeDeleteModal();
              }}
            >
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Fade>
    </Modal>
  );
};
export default DeleteModal;
