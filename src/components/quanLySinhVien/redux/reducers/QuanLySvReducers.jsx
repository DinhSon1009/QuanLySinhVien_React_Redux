import {
  SET_DANH_SACH_SV,
  SUA_SINH_VIEN,
  SUBMIT_SUA_SINH_VIEN,
  THEM_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../../constants/quanLySvConstants";

let initialState = {
  dssv: [],
  editSinhVien: null,
};

export const quanLySinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_SV: {
      return {
        ...state,
        dssv: action.payload,
      };
    }
    case THEM_SINH_VIEN: {
      let cloneArr = [...state.dssv];
      cloneArr.push(action.payload);
      state.dssv = cloneArr;
      return {
        ...state,
      };
    }
    case XOA_SINH_VIEN: {
      let id = action.payload;
      let cloneArr = [...state.dssv];
      cloneArr = cloneArr.filter((sv) => sv.id !== id);
      state.dssv = cloneArr;
      return { ...state };
    }
    case SUA_SINH_VIEN: {
      let id = action.payload;
      let index = state.dssv.findIndex((sv) => sv.id === id);
      return {
        ...state,
        editSinhVien: state.dssv[index],
      };
    }
    case SUBMIT_SUA_SINH_VIEN: {
      let cloneArr = [...state.dssv];
      let index = cloneArr.findIndex((sv) => sv.id === action.payload.id);
      cloneArr[index] = action.payload;
      console.log(cloneArr);
      return {
        ...state,
        dssv: [...cloneArr],
        editSinhVien: null,
      };
    }

    default:
      return state;
  }
};
