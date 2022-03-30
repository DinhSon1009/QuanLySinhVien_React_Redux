import React, { Component } from "react";
import { connect } from "react-redux";
import { SET_DANH_SACH_SV } from "./constants/quanLySvConstants";
import DanhSachSinhVien from "./DanhSachSinhVien/DanhSachSinhVien";
import ModalSV from "./ModalSV/ModalSV";
import { sinhVienServ } from "./svServices/sinhVienServices";
import { Typography } from "antd";

export class QuanlySv extends Component {
  state = {
    dssv: [],
  };
  componentDidMount() {
    let isSuccees = true;
    sinhVienServ
      .layDanhSachSinhVien()
      .then((res) => {
        this.props.setDssv(res.data);
      })
      .catch((err) => {
        isSuccees = false;
        console.log(err);
      });
  }
  render() {
    const { Text } = Typography;
    return (
      <div>
        <Typography.Title style={{ margin: "2rem", textAlign: "center" }}>
          <Text type="success">QUẢN LÝ SINH VIÊN</Text>
        </Typography.Title>
        <ModalSV />
        <DanhSachSinhVien />
      </div>
    );
  }
}
let mapDispatchTopProps = (dispatch) => {
  return {
    setDssv: (dssv) => {
      dispatch({
        type: SET_DANH_SACH_SV,
        payload: dssv,
      });
    },
  };
};
export default connect(null, mapDispatchTopProps)(QuanlySv);
