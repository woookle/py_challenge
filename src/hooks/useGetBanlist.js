import { useEffect } from "react";
import { useState } from "react";
import { getBanList } from "../api/api";
import { toast } from "react-toastify";

const useGetBanlist = () => {
  const [banlist, setBanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBanlist, setFilteredBanlist] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    async function getList() {
      try {
        setLoading(true);
        const response = await getBanList();
        setBanList(response.data.list);
      } catch (error) {
        toast.error("Не удалось получить банлист!");
      } finally {
        setLoading(false);
      }
    }
    getList();
  }, []);

  useEffect(() => {
    const filtered = banlist.filter(ban =>
      ban.username.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredBanlist(filtered);
  }, [filter, banlist]);

  return { filteredBanlist, loading, filter, setFilter };
};

export default useGetBanlist;
