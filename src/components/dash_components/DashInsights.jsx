import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
  Checkbox,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const insights = [
  {
    title: "Bathrooms",
    description:
      "Clean them, a user stated that some of the toilets were clogged",
    status: "Design",
    timeLogged: "13h 20m",
    statusColor: "success",
  },
  {
    title: "Food",
    description:
      "A user stated that the food was not up to par with what they paid for",
    status: "Concept",
    timeLogged: "8h 20m",
    statusColor: "primary",
  },
  {
    title: "Service",
    description:
      "A user stated that the service was lackluster because one of your employees was extremely rude",
    status: "Re-design",
    timeLogged: "80h 40m",
    statusColor: "warning",
  },
];

const DashInsights = () => {
  const theme = useTheme();
  const [taskList, setTaskList] = useState(insights);

  const addTask = () => {
    const newTask = {
      title: "New Task",
      description: "Description of the new task",
      status: "New",
      timeLogged: "0h 0m",
      statusColor: "default",
      completed: false, // Added completed field
    };
    setTaskList([...taskList, newTask]);
  };

  const toggleTaskCompletion = (index) => {
    const newTaskList = taskList.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTaskList(newTaskList);
  };

  return (
    <Box
      gridColumn="span 12"
      gridRow="span 3"
      backgroundColor={theme.palette.background.default}
      borderRadius="0.55rem"
      p="1rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml="1rem"
        mt="1rem"
        mr="1rem"
      >
        <Box display="flex" alignItems="center" gap="10px">
          <Typography variant="h3" fontWeight="bold">
            Insights
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            sx={{ textTransform: "none", borderRadius: "0.55rem" }}
          >
            Add Task
          </Button>
        </Box>
      </Box>
      <Box
        className="show-scrollbar"
        height="calc(100% - 5rem)" // Adjust height to fit within the parent box
        ml=".5rem"
        mt="2rem"
        p=".5rem"
        sx={{
          overflowY: "auto", // Ensure overflow content is scrollable
          maxHeight: "100%", // Prevent overflow
          "&::-webkit-scrollbar": { width: "2px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.common.black,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.black,
          },
        }}
      >
        <Stack spacing={2}>
          {taskList.map((insight, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                borderRadius: "0.55rem",
                width: "100%",
                opacity: insight.completed ? 0.5 : 1, // Adjust opacity based on completion
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight="bold">
                    {insight.title}
                  </Typography>
                  <Chip label={insight.status} color={insight.statusColor} />
                  <Checkbox
                    checked={insight.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.common.blue,
                      },
                    }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {insight.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body2" fontWeight="bold">
                    Estimated Time: {insight.timeLogged}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default DashInsights;
