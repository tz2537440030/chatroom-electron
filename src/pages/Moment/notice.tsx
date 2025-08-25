import useRequest from "@/hooks/useRequest";
import { changeMomentNoticeRead } from "@/services/moment";
import { getMomentNoticeList, setMomentNoticeRead } from "@/store/momentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "@/assets/images/default-avater.svg";
import { formatChatDatetime, getImageUrl } from "@/utils/utils";

const Notice = () => {
  const dispatch = useDispatch();
  const noticeTypeMap: any = {
    Comment: "评论",
    Like: "点赞",
  };
  const momentNoticeList = useSelector(getMomentNoticeList);
  const { run: runChangeNoticeRead } = useRequest(changeMomentNoticeRead, {
    onSuccess: (_res, params) => {
      dispatch(setMomentNoticeRead({ ids: params }));
    },
  });

  useEffect(() => {
    const unreadListIds = momentNoticeList
      .filter((item: any) => !item.isRead)
      .map((item: any) => item.id);
    runChangeNoticeRead(unreadListIds);
  }, []);

  return (
    <div className="overflow-scroll bg-white py-5">
      {momentNoticeList.map((item: any) => (
        <div
          key={item.id}
          className="flex border-b-[0.5px] border-gray-300 px-2 py-3 last:border-b-0"
        >
          <img
            src={getImageUrl(item.sender?.avatar)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultAvatar;
            }}
            className="mr-2 h-[44px] w-[44px] rounded-md"
          />
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <span>
                <span className="font-bold text-blue-600">
                  {item.sender.nickname + " "}
                </span>
                <span className="text-gray-500">
                  {noticeTypeMap[item.type]}了你的动态
                </span>
              </span>
              <span className="text-gray-500">
                {formatChatDatetime(item.createdAt)}
              </span>
            </div>
            <div className="bg-gray-200 text-xs text-gray-500">
              {item.moment.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notice;
