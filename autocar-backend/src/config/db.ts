import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING as string);
    console.log("Kết nối database thành công!!");
  } catch (error) {
    console.log("Connect database failed: ", error);
    process.exit(1); //Thoát với trạng thái thất bại còn số 0 thoát với tt thành công
  }
};
