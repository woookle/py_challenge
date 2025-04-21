import useGetBanlist from "../../hooks/useGetBanlist";
import BannedUsers from "./BannedUsers";

const BanlistContainer = () => {
  const { filteredBanlist, loading, filter, setFilter } = useGetBanlist();

  return (
    <BannedUsers banlist={filteredBanlist} loading={loading} filter={filter} setFilter={setFilter} />
  )
}

export default BanlistContainer;