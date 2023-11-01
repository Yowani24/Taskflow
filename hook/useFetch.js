import { useState, useEffect } from "react";
import axios from "axios";

const tasks = [
  {
    id: 1,
    projectName: "Ibá",
    activity: "Implementação de gráficos",
    start: "10/04/2023",
    end: "20/04/2023",
    status: "initialized",
    percentage: 60,
    developer: "João da Costa",
    role: "developer",
    subActivities: [
      { id: 1, name: "Implementar o HTML", status: "done" },
      { id: 2, name: "Fazer integração com o backend", status: "initialized" },
      {
        id: 3,
        name: "Fazer testes funcionas e de usablidade",
        status: "uninitialized",
      },
      { id: 4, name: "Fazer homologação", status: "uninitialized" },
    ],
  },
];

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [subActivityData, setSubActivityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchData = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await axios.get("http://taskflowapi2.onrender.com/project");

  //     setData(response.data);
  //   } catch (error) {
  //     setError(error);
  //     console.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const refetch = () => {
  //   fetchData();
  // };

  const fetchData = async () => {
    setLoading(true);

    try {
      const [projectResponse, subactivityResponse] = await Promise.all([
        axios.get("http://taskflowapi2.onrender.com/project"),
        axios.get("http://taskflowapi2.onrender.com/subactivity"),
      ]);

      setData(projectResponse.data);
      setSubActivityData(subactivityResponse.data);
    } catch (error) {
      setError(error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  const handleProcessUpdate = async (data, id) => {
    try {
      await axios.patch(
        `http://taskflowapi2.onrender.com/dadoshistorico/${id}`,
        data[0]
      );
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateProject = async (
    projectName,
    activity,
    start,
    end,
    developer,
    handleClose
  ) => {
    try {
      await axios.post("http://taskflowapi2.onrender.com/project", {
        projectName,
        activity,
        start,
        end,
        developer,
      });
      handleClose();
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(
        `http://taskflowapi2.onrender.com/project/${projectId}`
      );
      refetch();
    } catch (error) {
      console.error("Erro ao deletar projeto");
    }
  };
  // const handleDeleteProject = async (projectId) => {
  //   try {
  //     await axios.delete(`http://taskflowapi2.onrender.com/subactivity/${projectId}`);

  //     await axios.delete(`http://taskflowapi2.onrender.com/project/${projectId}`);
  //     refetch();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleCreateSubActivity = async (name, projectId) => {
    try {
      await axios.post("http://taskflowapi2.onrender.com/subactivity", {
        name,
        projectId,
      });
      refetch();
    } catch (error) {
      console.error("Erro ao criar SubActividade", error);
    }
  };

  const handleDeleteSubActivity = async (subactivityId) => {
    try {
      await axios.delete(
        `http://taskflowapi2.onrender.com/subactivity/${subactivityId}`
      );
      refetch();
    } catch (error) {
      console.error("Erro ao deletar SubActividade");
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const refetch = () => {
  //   fetchData();
  // };

  return {
    data,
    subActivityData,
    loading,
    error,
    handleCreateProject,
    handleDeleteProject,
    handleCreateSubActivity,
    handleProcessUpdate,
    handleDeleteSubActivity,
    refetch,
    tasks,
  };
};

export default useFetch;
