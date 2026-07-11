import { z } from "zod";

z.setErrorMap((issue) => {
  switch (issue.code) {
    case "invalid_type":
      return {
        message: "Sai kiểu dữ liệu",
      };

    case "too_small":
      return {
        message: "Dữ liệu quá ngắn",
      };

    default:
      return {
        message: "Dữ liệu không hợp lệ",
      };
  }
});
