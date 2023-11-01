import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Chip } from "@mui/material";
import { MdAddCircle } from "react-icons/md";
import useFetch from "../../../hook/useFetch";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function TaskCreateModal() {
  const { handleCreateProject, refetch } = useFetch();
  const [open, setOpen] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const [projectName, setProjectName] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [developer, setDeveloper] = React.useState("João da Costa");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Chip
        sx={{
          color: "#ffffff",
          cursor: "pointer",
          "&:hover": { background: "#e2e2e22c" },
          "&:active": { background: "#e2e2e210" },
        }}
        icon={<MdAddCircle color="#ffffff" size={25} />}
        label="Criar task"
        onClick={handleClickOpen}
      />
      <Dialog open={open} maxWidth={"lg"}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Criando task
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                background: "#ffffff",
                padding: 2,
                borderRadius: 2,
                marginTop: 2,
                width: 450,
                height: 400,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Selecione um projeto*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  value={projectName}
                  label="Selecione um projeto*"
                  onChange={handleChange}
                  size="small"
                  sx={{ marginBottom: 2, borderRadius: 2 }}
                >
                  <MenuItem value={"Ibá"}>Dikanda</MenuItem>
                  <MenuItem value={"Aperam"}>Farming</MenuItem>
                  <MenuItem value={"Inventário"}>Inventário</MenuItem>
                </Select>
              </FormControl>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                my={2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={startTime}
                      onChange={(newValue) => setStart(newValue as any)}
                      sx={{ width: 50 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={endTime}
                      onChange={(newValue) => setEnd(newValue as any)}
                      sx={{ width: 50 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <TextField
                id="outlined-multiline-flexible"
                label="Responsável"
                disabled
                required
                multiline
                maxRows={2}
                size="small"
                value={developer}
                fullWidth
                sx={{
                  background: "#ffffff",
                  marginBottom: 2,
                  borderRadius: 2,
                  marginTop: 2,
                }}
                onChange={(e) => setDeveloper(e.target.value)}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Digite o nome da atividade"
                required
                multiline
                maxRows={2}
                size="small"
                fullWidth
                sx={{ background: "#ffffff", borderRadius: 2, marginTop: 2 }}
                onChange={(e) => setActivity(e.target.value)}
              />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              handleCreateProject(
                projectName,
                activity,
                start,
                end,
                developer,
                handleClose
              ),
                refetch();
            }}
          >
            Criar Atividade
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
