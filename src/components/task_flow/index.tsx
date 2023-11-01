import React from "react";
import TopNavBar from "./TopNavBar";
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";
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
    <Box>
      <TopNavBar
        value={value}
        setStatus={setStatus}
        handleChange={handleChange}
      />
      <Box
        sx={{
          paddingX: 23,
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
    </Box>
  );
}
