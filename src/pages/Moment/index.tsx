import useRequest from "@/hooks/useRequest";
import { getMomentList } from "@/services/moment";
import { useEffect, useImperativeHandle } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearLastedMoment,
  getMomentNoticeList,
  selectMomentList,
  setMoment,
  setMomentList,
} from "@/store/momentSlice";
import { onMessage } from "@/services/websocket";
import { UPDATE_MOMENT_INFO } from "@/const";
import MomentTemplate from "@/components/MomentTemplte";
import { RightOutline } from "antd-mobile-icons";
import { Badge } from "antd-mobile";

const Moment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const momentList = useSelector(selectMomentList);
  const momentNoticeList = useSelector(getMomentNoticeList);
  const { ref } = useOutletContext<any>();
  const unreadCount = momentNoticeList.filter(
    (item: any) => !item.isRead,
  ).length;

  const { run } = useRequest<any, any>(getMomentList, {
    onSuccess: (res) => {
      dispatch(setMomentList({ momentList: res }));
    },
  });

  useImperativeHandle(ref, () => ({
    handleRightClick: handleCameraClick,
  }));

  const handleCameraClick = () => {
    navigate("/layout-blank/post-moment");
  };

  const handleJumpToNoticeList = () => {
    navigate("/layout-blank/moment-notice");
  };

  useEffect(() => {
    run({ skip: 0 });
    dispatch(clearLastedMoment());
    onMessage(UPDATE_MOMENT_INFO, (data: any) => {
      dispatch(setMoment({ moment: data.data }));
    });
  }, []);

  return (
    <>
      {unreadCount > 0 && (
        <div className="flex-center mb-2">
          <Badge content={unreadCount}>
            <div
              className="flex-center rounded-sm bg-gray-400 px-5 py-2"
              onClick={handleJumpToNoticeList}
            >
              新消息
              <RightOutline />
            </div>
          </Badge>
        </div>
      )}
      <MomentTemplate
        momentList={momentList}
        isHasNewNotice={unreadCount > 0}
      />
    </>
  );
};
export default Moment;
