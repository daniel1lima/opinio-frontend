import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Chip, Stack, Typography, useTheme, Checkbox, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';

const insights = [
  {
    title: "Clean/service the bathrooms",
    description: "Users complained that the bathrooms had a foul smell and were not clean.",
    status: "Facility",
    timeLogged: "4h 20m",
    statusColor: "success"
  },
  {
    title: "Improve starter food quality",
    description: "Multiple users have stated that the starter bread is stale and the butter is hard.",
    status: "Food",
    timeLogged: "20h 45m",
    statusColor: "info"
  },
  {
    title: "Greeter staff training", 
    description: "5 Users have commented on rude behavior from the greeter staff.",
    status: "Service",
    timeLogged: "60h 0m",
    statusColor: "warning"
  },

  {
    title: "Lower music prior to 8:00PM", 
    description: "Guests that arrive early have complained that the music is too loud, making it hard to have a conversation.",
    status: "Facility",
    timeLogged: "0h 20m",
    statusColor: "success"
  },

  {
    title: "Include online menu on tables", 
    description: "Guests have requested that the menu be available online and on the table through QR codes.",
    status: "Facility",
    timeLogged: "5h 15m",
    statusColor: "success"
  }
]

const DashInsights = () => {
  const theme = useTheme()
  const [taskList, setTaskList] = useState(insights)

  const addTask = () => {
    const newTask = {
      title: "New Task",
      description: "Description of the new task",
      status: "New",
      timeLogged: "0h 0m",
      statusColor: "default",
      completed: false // Added completed field
    }
    setTaskList([...taskList, newTask])
  }

  const toggleTaskCompletion = (index) => {
    const newTaskList = taskList.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTaskList(newTaskList)
  }

  return (
    <Box
      gridColumn="span 16"
      gridRow="span 4"
      backgroundColor={theme.palette.background.default}
      borderRadius="0.55rem"
      p="1rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out"
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" ml="1rem" mt="1rem" mr="1rem">
        <Box display="flex" alignItems="center" gap="10px">
          <Typography variant="h3" fontWeight="bold">
            Insights
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
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
                width: '100%', 
                opacity: insight.completed ? 0.5 : 1 // Adjust opacity based on completion
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold" mr={1}>
                    {insight.title}
                  </Typography>
                  <Chip label={insight.status} color={insight.statusColor}/>
                  <Checkbox
                    checked={insight.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    sx={{
                      color: theme.palette.primary.main,
                      '&.Mui-checked': {
                        color: theme.palette.secondary.main,
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
  )
}

export default DashInsights
