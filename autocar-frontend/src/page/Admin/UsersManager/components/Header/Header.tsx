import HeaderSearch from "../../../../../components/HeaderSearch/HeaderSearch";
import PageHeader from "../../../../../components/PageHeader/PageHeader";

interface Props {
  setSearch: (value: string) => void;
  setIsCreateFormOpen: (status: boolean) => void;
}

const Header = ({ setSearch, setIsCreateFormOpen }: Props) => {
  return (
    <PageHeader
      title="Quản lý người dùng"
      description="Quản lý thông tin người dùng AutoViet"
    >
      <HeaderSearch
        title="Tìm kiếm người dùng"
        placeholder="Nhập thông tin người dùng"
        onChangeSearch={setSearch}
        setOpen={setIsCreateFormOpen}
      ></HeaderSearch>
    </PageHeader>
  );
};

export default Header;
