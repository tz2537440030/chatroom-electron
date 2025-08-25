import request from "@/utils/request";

export const createMoment = ({
  content,
  imageUrls,
}: {
  content: string;
  imageUrls: string[];
}) => {
  return request.post("/moment/newMoment", {
    content,
    imageUrls,
  });
};

export const getMomentList = ({ skip }: { skip: number }) => {
  return request.post("/moment/getMomentList", {
    skip,
  });
};

export const likeMoment = ({ momentId }: { momentId: string }) => {
  return request.post("/moment/likeMoment", {
    momentId,
  });
};

export const cancelLikeMoment = ({ momentId }: { momentId: string }) => {
  return request.post("/moment/cancelLikeMoment", {
    momentId,
  });
};

export const createMomentComment = ({
  momentId,
  content,
}: {
  momentId: string;
  content: string;
}) => {
  return request.post("/moment/newMomentComment", {
    momentId,
    content,
  });
};

export const getMomentNoticeList = ({ skip }: { skip?: number }) => {
  return request.post("/moment/getMomentNoticeList", {
    skip,
  });
};

export const changeMomentNoticeRead = (ids: any[]) => {
  return request.post("/moment/changeMomentNoticeRead", {
    ids,
  });
};
