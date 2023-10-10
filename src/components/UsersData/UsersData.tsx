import { Users } from "../../main";
import { Link } from "react-router-dom";

const UsersData = ({ users }: { users: Users[] }) => {
  return (
    <div>
      {users.map((user) => (
        <Link to={`/${user.id}`} key={user.id}>
          <div>{user.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default UsersData;
