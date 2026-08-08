export interface StaffInfo {
  department: string;
  position: string;
  phone: string;
}

export interface Staff {
  _id: string;

  username: string;

  email: string;

  avatar?: string;

  carCount: number;

  staffInfo?: StaffInfo;
}
