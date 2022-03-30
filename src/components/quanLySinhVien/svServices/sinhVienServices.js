import axios from "axios";

const BASE_URL = "https://621b1529faa12ee45004ec80.mockapi.io/sinhvien";

export const sinhVienServ = {
  layDanhSachSinhVien: () => {
    return axios({
      method: "GET",
      url: BASE_URL,
    });
  },
};
