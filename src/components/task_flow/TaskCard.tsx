import React from "react";
import { Box, Card, Stack, Typography, Avatar } from "@mui/material";

//ICONS
import { TbCalendarTime } from "react-icons/tb";
import { RiCalendarCheckLine } from "react-icons/ri";
import TasksDetails from "./TasksDetails";

export default function TaskCard(props) {
  return (
    <Card
      sx={{
        minWidth: 380,
        height: 180,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderRadius: 4,
        boxShadow: "rgba(15, 8, 8, 0.1) -4px 9px 25px -6px",
        "&:hover": { boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px" },
        border: "1px solid #e5e7eb",
        background: "#f7f9fd",
      }}
    >
      <Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={20} color={"#777676"} fontWeight={"bold"}>
            {props.projectName}
          </Typography>
          <TasksDetails taskId={props.taskId} />
        </Stack>
        <Typography mt={2} color={"#727272"}>
          {props.activity}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2} mt={4.5}>
          <Typography
            display={"flex"}
            alignItems={"center"}
            fontSize={12}
            bgcolor={"#ffffff"}
            border={"1px solid #dde6f3e3"}
            borderRadius={50}
            paddingX={1}
            color={"gray"}
            gap={1}
          >
            <TbCalendarTime /> {props.start}
          </Typography>
          <Typography
            display={"flex"}
            alignItems={"center"}
            fontSize={12}
            bgcolor={"#ffffff"}
            border={"1px solid #dde6f3e3"}
            borderRadius={50}
            paddingX={1}
            color={"gray"}
            gap={1}
          >
            <RiCalendarCheckLine /> {props.end}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        gap={1}
        alignItems={"center"}
        mt={2}
        sx={{ borderTop: "1px solid #ebe8e8" }}
        paddingTop={1}
      >
        <Avatar
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
          sx={{ width: 30, height: 30, background: "#c2bef59f" }}
        />
        <Typography
          fontSize={12}
          bgcolor={"#ffffff"}
          border={"1px solid #dde6f3e3"}
          sx={{ borderRadius: 20, paddingX: 1 }}
        >
          {props.developer}
        </Typography>
        <Stack ml={5}>
          <Typography fontSize={11}>
            {props.status === "initialized"
              ? "Em desenvolvimento"
              : props.status === "done"
              ? "Conclído"
              : props.status === "standby"
              ? "Em espera"
              : ""}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Box
              mt={0.5}
              sx={{
                width: 150,
                height: 8,
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                borderRadius: 50,
                paddingX: 0.4,
              }}
            >
              <Box
                sx={{
                  width: `${props.percentage}%`,
                  height: 4,
                  background: props.status === "standby" ? "gray" : "#00ff6a",
                  borderRadius: 50,
                }}
              ></Box>
            </Box>{" "}
            <Typography fontSize={12}>{props.percentage}%</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
