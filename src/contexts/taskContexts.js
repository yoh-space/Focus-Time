import { createContext, useContext, useState } from 'react';

export const TaskContext = createContext();

export default function TaskProvider({children}) {
  const [task , setTask ] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState("");

  const value = {task, setTask, tasks, setTasks, selectedTask, setSelectedTask};
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext);
    return context;
}