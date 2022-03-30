import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import "antd/dist/antd.css";
import { SUA_SINH_VIEN, XOA_SINH_VIEN } from "../constants/quanLySvConstants";

export class DanhSachSinhVien extends Component {
  render() {
    let { dssv, xoaSv, suaSv } = this.props;
    const { Column } = Table;

    return (
      <Table dataSource={[...dssv]} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          title="Edit"
          key="edit"
          render={(text, row) => (
            <>
              <Button
                type="primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => suaSv(row["id"])}
              >
                EDIT
              </Button>
              <Button type="danger" onClick={() => xoaSv(row["id"])}>
                DELETE
              </Button>
            </>
          )}
        />
      </Table>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    dssv: state.quanLySinhVienReducer.dssv,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    xoaSv: (id) =>
      dispatch({
        type: XOA_SINH_VIEN,
        payload: id,
      }),
    suaSv: (sv) => {
      dispatch({
        type: SUA_SINH_VIEN,
        payload: sv,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachSinhVien);
