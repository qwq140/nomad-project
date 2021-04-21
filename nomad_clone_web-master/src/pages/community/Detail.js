import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  CommunityBoard,
  CommunityDetailBack,
  CommunityDetailContainer,
  CommunityWrite,
  CommunityDetailItem,
  CommunityBoardContainer,
  CommunityReplyBoxContainer,
  DetailContent,
  CommunityReplyCounter,
  ReplyInputForm,
  DeleteCommunity,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  communityOneGetRequestAction,
  replyPostRequestAction,
} from "../../reducers/community";
import CommunityReplyItem from "../../components/CommunityReplyItem";
import ReactHtmlParser from "react-html-parser";
import { Button, Form } from "antd";
import { Input } from "antd";
import { timeForToday } from "../../util/Script";
import AppLayout from "../../components/AppLayout";
import { useForm } from "antd/lib/form/Form";
import DetailLikeButton from "../../components/adminCourses/DetailLikeButton";
import ComDeleteButton from "../../components/ComDeleteButton";

const CommunityDetail = ({ match }) => {
  const { principal } = useSelector((state) => state.user);
  console.log("프린시퍼정보", principal);
  const { communityItem } = useSelector((state) => state.community);
  console.log("커뮤니티아이템 정보", communityItem);
  const { replyPostLoading } = useSelector((state) => state.community);
  const [form] = useForm();

  const comId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(communityOneGetRequestAction(comId));
  }, []);

  // 댓글 서브밋
  const onSubmit = (values) => {
    const data = { ...values, comId };
    dispatch(replyPostRequestAction(data));
    form.setFieldsValue({ content: "" });
  };

  return (
    <>
      <AppLayout>
        <CommunityDetailContainer justify="center">
          {/* 카테고리 */}
          <CommunityDetailBack span={5}>
            <Link to="/community">
              <ArrowLeftOutlined /> Go back
            </Link>
          </CommunityDetailBack>
          {/* 중앙 Board */}
          <CommunityBoard span={14}>
            <CommunityBoardContainer>
              <CommunityDetailItem size="large">
                <div className="Detail-top">
                  <div className="Board-Fav">
                    <DetailLikeButton
                      listId={communityItem !== null ? communityItem.id : null}
                      count={
                        communityItem !== null ? communityItem.likeCount : null
                      }
                      state={
                        communityItem !== null ? communityItem.likeCheck : null
                      }
                    />
                  </div>
                  <div className="Board-Body">
                    {/* 여기고치는중 */}
                    <div className="Board-Body-Title">
                      {communityItem !== null ? (
                        <>
                          {communityItem.community !== null
                            ? communityItem.community.title
                            : null}
                        </>
                      ) : (
                        "Title"
                      )}
                    </div>
                    {/* 여기고치는중 */}
                    <div className="Board-Body-Info">
                      <div className="Info-Tag">
                        in &nbsp;
                        <span>
                          {communityItem !== null ? (
                            <>
                              {communityItem.community !== null
                                ? communityItem.community.category.title
                                : null}
                            </>
                          ) : (
                            "Category"
                          )}
                        </span>
                      </div>
                      <div className="Info-Name">
                        by &nbsp;
                        <Link
                          to={`/dashboard/${
                            communityItem !== null ? (
                              <>
                                {communityItem.community !== null
                                  ? communityItem.community.user.id
                                  : null}
                              </>
                            ) : (
                              "userId"
                            )
                          }`}
                        >
                          <span>
                            {communityItem !== null ? (
                              <>
                                {communityItem.community !== null
                                  ? communityItem.community.user.name
                                  : null}
                              </>
                            ) : (
                              "Title"
                            )}
                          </span>
                        </Link>
                      </div>
                      <div className="Info-Date">
                        &#8226; &nbsp;
                        <span>
                          {communityItem !== null
                            ? timeForToday(communityItem.community.createDate)
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="Board-UserImg">
                    <Link
                      to={`/dashboard/${
                        communityItem !== null ? (
                          <>
                            {communityItem.community !== null
                              ? communityItem.community.user.id
                              : null}
                          </>
                        ) : (
                          "userId"
                        )
                      }`}
                    >
                      <img
                        src={
                          communityItem !== null
                            ? communityItem.community.user.imageUrl
                            : ""
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <DetailContent>
                  <p>
                    {communityItem !== null
                      ? ReactHtmlParser(communityItem.community.content)
                      : "Content"}
                  </p>
                </DetailContent>
              </CommunityDetailItem>
              {/* 글삭제 버튼 */}
              {communityItem !== null ? (
                <>
                  {principal !== null ? (
                    <>
                      {communityItem.community.user.id === principal.id ? (
                        <>
                          <DeleteCommunity>
                            <ComDeleteButton data={communityItem.id} />
                          </DeleteCommunity>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}

              {/* 여기 댓글 작성 폼 */}
              <ReplyInputForm onFinish={onSubmit} form={form}>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please Input content!!",
                      type: "string",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={replyPostLoading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </ReplyInputForm>

              {/* 여기 영역에  댓글박스*/}
              <CommunityReplyBoxContainer>
                <CommunityReplyCounter>
                  <span>
                    <b>
                      {communityItem !== null
                        ? communityItem.community.replys.length
                        : ""}
                    </b>
                    comments
                  </span>
                </CommunityReplyCounter>
                {communityItem !== null
                  ? communityItem.community.replys.map((list) => (
                      <>
                        <CommunityReplyItem
                          key={"comment-" + list.id}
                          list={list}
                        />
                      </>
                    ))
                  : null}
              </CommunityReplyBoxContainer>
            </CommunityBoardContainer>
          </CommunityBoard>
          {/* 글쓰기 버튼 */}
          <CommunityWrite span={5}></CommunityWrite>
        </CommunityDetailContainer>
      </AppLayout>
    </>
  );
};

export default CommunityDetail;
