import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const getInitialMomentState = () => {
  return {
    momentList: [] as any,
    lastedMoment: null as any,
    momentNoticeList: [] as any,
  };
};

export const momentSlice = createSlice({
  name: "moment",
  initialState: getInitialMomentState(),
  reducers: {
    setMomentList: (state, action) => {
      const { momentList } = action.payload;
      state.momentList = momentList;
    },
    setMoment: (state, action) => {
      const { moment } = action.payload;
      state.momentList = state.momentList.map((item: any) =>
        item.id === moment.id ? moment : item,
      );
    },
    setLastedMoment: (state, action) => {
      const { moment } = action.payload;
      state.lastedMoment = moment;
      state.momentList = [moment, ...state.momentList];
    },
    clearLastedMoment: (state) => {
      state.lastedMoment = null;
    },
    setMomentNoticeList: (state, action) => {
      const { momentNoticeList } = action.payload;
      state.momentNoticeList = momentNoticeList;
    },
    pushMomentNotice: (state, action) => {
      const { momentNotice } = action.payload;
      state.momentNoticeList = [momentNotice, ...state.momentNoticeList];
    },
    setMomentNoticeRead: (state, action) => {
      const { ids } = action.payload;
      state.momentNoticeList = state.momentNoticeList.map((item: any) => {
        if (ids.includes(item.id)) {
          return {
            ...item,
            isRead: true,
          };
        }
        return item;
      });
    },
  },
});

export const {
  setMomentList,
  setMoment,
  setLastedMoment,
  clearLastedMoment,
  setMomentNoticeList,
  pushMomentNotice,
  setMomentNoticeRead,
} = momentSlice.actions;

export default momentSlice.reducer;

// Selectors
export const selectMomentList = (state: { moment: { momentList: any } }) =>
  state.moment.momentList;

export const selectLastedMoment = (state: { moment: { lastedMoment: any } }) =>
  state.moment.lastedMoment;

export const getMomentNoticeList = (state: {
  moment: { momentNoticeList: any };
}) => state.moment.momentNoticeList;
