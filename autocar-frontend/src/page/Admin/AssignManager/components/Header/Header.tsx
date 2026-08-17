import PageHeader from "../../../../../components/PageHeader/PageHeader";
import type { FilterType } from "../../types/assignManagerType";
import CarFilterBar from "../CarFilterBar/CarFilterBar";

interface Props {
  filter: FilterType;
  setFilter: (val: FilterType) => void;
}

export const Header = ({ filter, setFilter }: Props) => {
  return (
    <PageHeader
      title="Phân Bổ Nhân Viên Quản Lý Xe"
      description="Quản lý xe phân công cho nhân viên"
    >
      <CarFilterBar active={filter} onChange={setFilter} />
    </PageHeader>
  );
};
