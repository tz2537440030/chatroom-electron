import { selectCurrentUser } from "@/store/authSlice";
import { Avatar, Badge, List } from "antd-mobile";
import { useSelector } from "react-redux";
import { PictureOutline, UploadOutline } from "antd-mobile-icons";
import { persistor } from "@/store";
import { useNavigate } from "react-router-dom";
import { closeWebsocket } from "@/services/websocket";
import { getMomentNoticeList, selectLastedMoment } from "@/store/momentSlice";
import { getImageUrl } from "@/utils/utils";

const Mine = () => {
  const currentUser = useSelector(selectCurrentUser);
  const lastedMoment = useSelector(selectLastedMoment);
  const momentNoticeList = useSelector(getMomentNoticeList);
  const navigate = useNavigate();
  const unreadCount = momentNoticeList.filter(
    (item: any) => !item.isRead
  ).length;

  const mineList = [
    {
      name: "朋友圈",
      icon: <PictureOutline />,
      onClick: () => {
        navigate("/layout-blank/moment");
      },
      unreadNotice: unreadCount,
      arrowIcon: lastedMoment ? (
        <Badge content={Badge.dot}>
          <Avatar
            src={getImageUrl(lastedMoment?.user.avatar)}
            style={{ "--size": "32px" }}
          />
        </Badge>
      ) : (
        true
      ),
    },
    {
      name: "退出登录",
      icon: <UploadOutline />,
      onClick: () => {
        persistor.purge();
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        closeWebsocket();
        navigate("/");
      },
    },
  ];

  return (
    <>
      <List header="个人信息" className="mb-4">
        <List.Item
          key={currentUser.username}
          prefix={<Avatar src={getImageUrl(currentUser.avatar)} />}
          description={currentUser.username}
          onClick={() => navigate("/layout-blank/user-info")}
        >
          {currentUser.nickname}
        </List.Item>
      </List>
      <List>
        {mineList.map((item: any) => (
          <List.Item
            key={item.name}
            prefix={item.icon}
            onClick={item.onClick}
            arrowIcon={item.arrowIcon}
          >
            <Badge
              content={item.unreadNotice > 0 ? "+" + item.unreadNotice : null}
            >
              {item.name}
            </Badge>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Mine;
