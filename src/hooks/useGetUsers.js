import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { toast } from "react-toastify";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response.data.userList);
      } catch (error) {
        toast.error("Ошибка при загрузке пользователей!");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
  };
};

export default useGetUsers;