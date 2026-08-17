import PageHeader from "../../../../../components/PageHeader/PageHeader";
import HeaderSearch from "../../../../../components/HeaderSearch/HeaderSearch";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOpenCreate: (status: boolean) => void;
}

const CarHeader = ({ setSearch, setOpenCreate }: Props) => {
  return (
    <PageHeader
      title="Quản lý xe hệ thống"
      description="Cập nhật các loại xe của hệ thống AutoViet"
    >
      <HeaderSearch
        setOpen={setOpenCreate}
        onChangeSearch={setSearch}
      ></HeaderSearch>
    </PageHeader>
  );
};

export default CarHeader;
