import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

interface Tasks {
  id?: number;
  title?: string;
}

const UserTasks = ({ id }: Tasks) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const context = useOutletContext<string | undefined>();

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${context}`
        );
        if (res.status >= 200 && res.status < 300) {
          const data = res.data;
          setTasks(data);
        } else {
          console.log("Error fetching data. status code: ", res.status);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchUserTasks();
  }, [id]);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default UserTasks;
