import React from "react";
import TopNavBar from "./TopNavBar";
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";
import Chip from "@mui/material/Chip";
import useFetch from "../../../hook/useFetch";

const logedInUserName = "João da Costa";

export default function TaskFlow() {
  const { data: fetchedData, loading, refetch } = useFetch();

  const [value, setValue] = React.useState(1);
  const [status, setStatus] = React.useState("tudo");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TopNavBar />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Chip
            label="Tudo"
            sx={{ marginRight: 5, background: value == 1 ? "#b9b9b9" : "" }}
            onClick={() => {
              handleChange(1);
              setStatus("tudo");
            }}
          />
          <Chip
            label="Em desenvolvimento"
            sx={{ background: value == 2 ? "#b9b9b9" : "" }}
            onClick={() => {
              handleChange(2);
              setStatus("initialized");
            }}
          />
          <Chip
            sx={{ marginX: 5, background: value == 3 ? "#b9b9b9" : "" }}
            label="Em espera"
            onClick={() => {
              handleChange(3);
              setStatus("standby");
            }}
          />
          <Chip
            sx={{ background: value == 4 ? "#b9b9b9" : "" }}
            label="Concluído"
            onClick={() => {
              handleChange(4);
              setStatus("done");
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 10,
          paddingY: 5,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {fetchedData
          .filter(
            (item) =>
              (status === "tudo" || item.status === status) &&
              item.developer === logedInUserName
          )
          .map((item) => (
            <TaskCard
              key={item.id}
              projectName={item.projectName}
              activity={item.activity}
              start={new Date(item.start).toISOString().split("T")[0]}
              end={new Date(item.end).toISOString().split("T")[0]}
              status={item.status}
              percentage={item.percentage}
              developer={item.developer}
              taskId={item.id}
            />
          ))}
      </Box>
    </div>
  );
}
