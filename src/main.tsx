import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersData from "./components/UsersData/UsersData.tsx";
import UserData from "./components/UserData/UserData.tsx";
import axios from "axios";
import UserTasks from "./components/UserTasks/UserTasks.tsx";

export interface Users {
  id?: number;
  name?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone?: string;
}

const Main = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (res.status >= 200 && res.status < 300) {
          const data = res.data;
          setUsers(data);
        } else {
          console.log("Error fetching data. status code:", res.status);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUsersData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UsersData users={users} />,
    },
    {
      path: "/:userId",
      element: <UserData />,
      children: [
        {
          path: "todos",
          element: <UserTasks />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(<Main />);
