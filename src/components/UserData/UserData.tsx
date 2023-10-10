import { Users } from "../../main";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import { Button } from "@mui/material";

type ContactParams = {
  userId: string;
};

const UserData = () => {
  const [user, setUser] = useState<Users>();
  const { userId } = useParams<ContactParams>();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (res.status >= 200 && res.status < 300) {
          const data = res.data;
          setUser(data);
        } else {
          console.log("Error fetching data. status code:", res.status);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUsersData();
  }, [userId]);

  return (
    <div key={user?.id}>
      <p>{user?.email}</p>
      <p>{user?.address?.street}</p>
      <p>{user?.address?.city}</p>
      <p>{user?.address?.suite}</p>
      <p>{user?.address?.zipcode}</p>
      <p>{user?.address?.geo.lat}</p>
      <p>{user?.address?.geo.lng}</p>
      <p>{user?.phone}</p>
      <br />
      <br />
      <Link to={`/todos/${user?.id}`}>
        <Button variant="contained">Go to tasks</Button>
      </Link>
      <Outlet context={userId} />
    </div>
  );
};

export default UserData;
