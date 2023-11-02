import React from "react";
import TopNavBar from "./TopNavBar";
import { Box, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import useFetch from "../../../hook/useFetch";
// import { BarsLoader } from 'react-loaders-kit';
import { RotatingCircleLoader } from "react-loaders-kit";

const logedInUserName = "João da Costa";

export default function TaskFlow() {
  const { data: fetchedData, loading, refetch } = useFetch();
  // const [loading, setLoading] = React.useState(true);

  const loaderProps = {
    loading,
    size: 16,
    duration: 2,
    colors: ["#f6b93b", "#f235f8", "#5e22f0", "#5e22f0"],
  };
  const [value, setValue] = React.useState(1);
  const [status, setStatus] = React.useState("tudo");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      {loading ? (
        <Box
          width={"100%"}
          height={"100vh"}
          bgcolor={"#fff"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Stack alignItems={"center"} gap={3}>
            <Typography fontSize={25} fontWeight={"bold"} color={"#5e22f0"}>
              Tas<span style={{ color: "#f89335" }}>kfl</span>ow
            </Typography>
            <RotatingCircleLoader {...loaderProps} />
          </Stack>
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}
