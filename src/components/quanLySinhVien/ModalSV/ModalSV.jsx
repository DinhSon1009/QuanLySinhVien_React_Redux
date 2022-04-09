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
    values: null,
    errors: null,
    valid: false,
  };
  handleInput = (e) => {
    let tagInput = e.target;
    let { name, value, pattern } = tagInput;
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage = name + " không được bỏ trống !";
    }

    if (name === "name") {
      const regex = new RegExp(pattern);
      if (regex.test(value)) {
        errorMessage = name + " không đúng định dạng !";
      }
    }
    if (
      value !== "" &&
      (name === "phone" || name === "email" || name === "id")
    ) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        if (name === "phone") {
          errorMessage = name + " có độ dài 9-15 số";
        } else {
          errorMessage = name + " không đúng định dạng !";
        }
      }
    }
    if (name === "id") {
      let index = this.props.dssv.findIndex((sv) => sv.id === value);
      if (value.trim().length >= 7) {
        errorMessage = name + " ít hơn 8 ký tự";
      }
      if (value !== "" && index !== -1) {
        errorMessage = name + " đã tồn tại !";
      }
    }

    let values = { ...this.state.values, [name]: value };
    let errors = { ...this.state.errors, [name]: errorMessage };

    this.setState(
      {
        ...this.state,
        values: values,
        errors: errors,
      },
      () => {
        // console.log(this.state);
        this.checkValid();
      }
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    nextProps.editSinhVien
      ? this.setState({
          ...this.state,
          values: nextProps.editSinhVien,
          errors: null,
        })
      : this.setState({
          values: null,
          errors: null,
        });
  }
  checkValid = () => {
    let valid = true;
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "" || this.state.values[key] === "") {
        valid = false;
      }
    }
    this.setState({
      ...this.state,
      valid: valid,
    });
  };

  handleReset = () => {
    this.setState({
      ...this.state,
      errors: null,
      values: null,
    });
  };
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
            onClick={() => {
              this.handleReset();
              this.props.resetEditSinhVien();
            }}
          >
            Thêm sinh viên
          </Button>
          {/* The Modal */}
          <div
            className="modal"
            id="myModal"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">
                    {this.props.editSinhVien
                      ? "Cập nhật sinh viên"
                      : "Thêm sinh viên"}
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    onClick={() => this.props.resetEditSinhVien()}
                  >
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
                      pattern="^(0|[1-9][0-9]*)$"
                      disabled={this.props.editSinhVien ? true : false}
                      value={this.state.values?.id ? this.state.values.id : ""}
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Enter ID"
                      aria-describedby="helpId"
                    />
                    <div className="text-danger">{this.state.errors?.id}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>

                    <Input
                      type="text"
                      name="name"
                      id="name"
                      pattern="[0-9]"
                      className="form-control"
                      placeholder="Enter name"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={
                        this.state.values?.name ? this.state.values.name : ""
                      }
                    />
                    <div className="text-danger">{this.state.errors?.name}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Email</label>

                    <Input
                      type="email"
                      name="email"
                      id="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="form-control"
                      placeholder="Enter email"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={
                        this.state.values?.email ? this.state.values.email : ""
                      }
                    />
                    <div className="text-danger">
                      {this.state.errors?.email}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>

                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      pattern="^([0-9]{9,15})$"
                      className="form-control"
                      placeholder="Enter phone number"
                      aria-describedby="helpId"
                      onChange={this.handleInput}
                      value={
                        this.state.values?.phone ? this.state.values.phone : ""
                      }
                    />
                    <div className="text-danger">
                      {this.state.errors?.phone}
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  {this.props.editSinhVien ? (
                    <Button
                      type="primary"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => {
                        if (this.state.valid) {
                          this.props.suaSv(this.state.values);
                        } else {
                          alert(
                            "Không có thay đổi hoặc thay đổi không hợp lệ !"
                          );
                          this.props.resetEditSinhVien();
                        }
                      }}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => {
                        if (this.state.valid) {
                          this.props.submitForm(this.state.values);
                        } else {
                          alert("Thêm thất bại !");
                        }
                      }}
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
