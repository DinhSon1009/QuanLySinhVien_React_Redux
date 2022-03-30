import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Input } from "antd";
import { connect } from "react-redux";
import {
  SUA_SINH_VIEN,
  SUBMIT_SUA_SINH_VIEN,
  THEM_SINH_VIEN,
} from "../constants/quanLySvConstants";

export class ModalSV extends Component {
  state = {
    sinhVien: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
  };
  handleInput = (e) => {
    this.setState({
      sinhVien: { ...this.state.sinhVien, [e.target.name]: e.target.value },
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    nextProps.editSinhVien
      ? this.setState({ sinhVien: nextProps.editSinhVien })
      : this.setState({
          sinhVien: {
            id: "",
            name: "",
            email: "",
            phone: "",
          },
        });
  }
  render() {
    return (
      <div>
        <div>
          <Button
            type="primary"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            style={{ marginBottom: "2rem" }}
            onClick={() => this.props.resetEditSinhVien()}
          >
            Thêm sinh viên
          </Button>
          {/* The Modal */}
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">
                    {this.props.editSinhVien
                      ? "Cập nhật sinh viên"
                      : "Thêm sinh viên"}
                  </h4>
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <Input
                      type="text"
                      name="id"
                      id="id"
                      disabled={this.props.editSinhVien ? true : false}
                      value={this.state.sinhVien.id}
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Enter ID"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>

                    <Input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Enter name"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={this.state.sinhVien.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Email</label>

                    <Input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter email"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={this.state.sinhVien.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>

                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={this.state.sinhVien.phone}
                    />
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  {this.props.editSinhVien ? (
                    <Button
                      type="primary"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => this.props.suaSv(this.state.sinhVien)}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => this.props.submitForm(this.state.sinhVien)}
                    >
                      Thêm
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    editSinhVien: state.quanLySinhVienReducer.editSinhVien,
    dssv: state.quanLySinhVienReducer.dssv,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (sv) => {
      dispatch({
        type: THEM_SINH_VIEN,
        payload: sv,
      });
    },
    resetEditSinhVien: () => {
      dispatch({
        type: SUA_SINH_VIEN,
        payload: null,
      });
    },
    suaSv: (sv) => {
      dispatch({
        type: SUBMIT_SUA_SINH_VIEN,
        payload: sv,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSV);
