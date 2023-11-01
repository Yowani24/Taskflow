import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Stack } from "@mui/material";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useFetch from "../../../hook/useFetch";
import { Typography } from "@mui/material";
import { BsStopwatchFill, BsFillPlayCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiDeleteBack2Fill } from "react-icons/ri";

export default function TasksDetails({ taskId }) {
  const {
    data: ProjectName,
    subActivityData: fetchedData,
    loading,
    refetch,
    handleCreateSubActivity,
    handleDeleteSubActivity,
    handleDeleteProject,
  } = useFetch();
  console.log(fetchedData);
  const [open, setOpen] = React.useState(false);
  const [progressPercentage, setProgressPercentage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subActivityName, setSubActivityName] = React.useState("");
  const openMenu = Boolean(anchorEl);

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSubActivityName(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteProjectFunction = (taskId) => {
    handleCloseMenu;
    handleDeleteProject(taskId);
  };

  const handleCheckboxChange = (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalCheckboxes = checkboxes.length;
    const checkedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;

    if (checkedCheckboxes === totalCheckboxes) {
      setProgressPercentage(100);
    } else {
      const percentage = (checkedCheckboxes / totalCheckboxes) * 100;
      setProgressPercentage(percentage);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar
        sx={{
          bgcolor: "#dadada",
          width: 30,
          height: 30,
          cursor: "pointer",
          "&:hover": { background: "gray" },
          transition: ".2s",
        }}
        onClick={handleClickOpen}
      >
        <FaUpRightAndDownLeftFromCenter size={15} />
      </Avatar>
      <Dialog open={open}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {ProjectName.filter((item) => item.id == taskId).map(
            (item) => item.activity
          )}
          <Avatar
            sx={{
              bgcolor: "#dadada",
              width: 30,
              height: 30,
              cursor: "pointer",
              "&:hover": { background: "gray" },
              transition: ".2s",
            }}
            onClick={handleClick}
          >
            <BiDotsHorizontalRounded />
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleCloseMenu}
              sx={{ "&:hover": { color: "#6258f1" }, color: "gray" }}
            >
              <BsFillPlayCircleFill
                // color="gray"
                style={{ marginRight: 10 }}
                size={15}
                className="menuIcon"
              />
              <Typography fontSize={12}>Ativar</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              sx={{ "&:hover": { color: "#6258f1" }, color: "gray" }}
            >
              <BsStopwatchFill style={{ marginRight: 10 }} size={15} />
              <Typography fontSize={12}>Desativar</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleDeleteProjectFunction(taskId);
              }}
              sx={{ "&:hover": { color: "#f16a58" }, color: "gray" }}
            >
              <RiDeleteBack2Fill style={{ marginRight: 10 }} size={15} />
              <Typography fontSize={12}>Excluir atividade</Typography>
            </MenuItem>
          </Menu>
        </DialogTitle>
        <DialogContent>
          <h3>
            Estágio de desenvolvimento{" "}
            <span style={{ color: "#63e763" }}>
              {Math.ceil(progressPercentage)}%
            </span>{" "}
          </h3>
          <DialogContentText>
            Especificação e estágio das atividades a serem desenvolvidas
            <Stack direction={"row"} mt={2} alignItems={"center"} gap={2}>
              <input
                className="input_placeholder"
                style={{
                  outline: "none",
                  borderRadius: 5,
                  border: "none",
                  borderWidth: 0.5,
                  padding: "5px 8px",
                  paddingBottom: 7,
                  background: "#e3e9f1",
                }}
                onChange={handleInputChange}
                placeholder="Digite nova atividade"
              />
              <Button
                sx={{
                  fontSize: 10,
                  background: "#6258f1",
                  "&:hover": { background: "#6258f1" },
                }}
                variant="contained"
                disableElevation
                onClick={() => handleCreateSubActivity(subActivityName, taskId)}
                disabled={isButtonDisabled}
              >
                Criar
              </Button>
            </Stack>
            <Box
              sx={{
                background: "#e1e8ec",
                padding: 2,
                borderRadius: 2,
                marginTop: 2,
                width: 520,
                height: 200,
                display: "flex",
                flexWrap: "wrap",
                overflow: "auto",
              }}
            >
              {fetchedData
                .filter((item) => item.projectId == taskId)
                .map((item) => (
                  <FormGroup key={item.id} sx={{ position: "relative" }}>
                    <FormControlLabel
                      sx={{
                        background: "#f0f0f0",
                        borderRadius: 50,
                        paddingX: 1,
                        margin: 1,
                        transition: ".1s",
                        "&:hover": {
                          background: "#d5d5e4",
                          ".yourBoxClassName": {
                            display: "none",
                          },
                        },
                        cursor: "default",
                      }}
                      control={<Checkbox onChange={handleCheckboxChange} />}
                      label={item.name}
                    />
                    <Box
                      className="yourBoxClassName"
                      onClick={() => handleDeleteSubActivity(item.id)}
                      sx={{
                        background: "#e79f9f",
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        position: "absolute",
                        top: -6,
                        right: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <TiDelete size={20} color="#ffffff" />
                    </Box>
                  </FormGroup>
                ))}
            </Box>
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          ></Box>
          {fetchedData
            .filter((item) => item.id == taskId)
            .map((item) => (
              <Typography fontSize={12} mt={1} key={item.id}>
                {item.status === "initialized"
                  ? "Em desenvolvimento"
                  : item.status === "done"
                  ? "Conclído"
                  : item.status === "standby"
                  ? "Em espera"
                  : ""}
              </Typography>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Concluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
