import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Progress } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { CourseTitleIcon, VideoLayout, CourseTitle, VideoMain } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { videoGetRequestAction } from "../../reducers/video";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Detail = ({ match }) => {
  const [vimeo, setVimeo] = useState("");
  const [vimeoTitle, setVimeoTitle] = useState("");
  const id = match.params.id;
  const dispatch = useDispatch();
  const { videoList } = useSelector((state) => state.video);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(videoGetRequestAction(id));
  }, []);

  useEffect(() => {
    if (videoList !== null) {
      setVimeo(videoList.contents[0].list[0].vimeoId);
      setVimeoTitle(videoList.contents[0].list[0].title);
    }
  }, [videoList]);

  const onCollapse = () => setCollapsed(!collapsed);
  const onClickHandler = useCallback(({ item }) => {
    setVimeo(item.props.vimeoId);
    setVimeoTitle(item.props.children[1]);
  }, []);
  console.log(videoList);

  return (
    <>
      <VideoLayout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          {collapsed ? (
            <Link to="/">
              <CourseTitleIcon>
                <HomeOutlined />
              </CourseTitleIcon>
            </Link>
          ) : (
            <div className="CourseTitle">
              <h3>[풀스택] 유튜브 클론코딩</h3>
              <Progress percent={0} status="active" />
            </div>
          )}

          <Menu
            theme="dark"
            defaultSelectedKeys={["0-0"]}
            defaultOpenKeys={["0"]}
            mode="inline"
          >
            {videoList !== null
              ? videoList.contents.map((list, index) => (
                  <SubMenu
                    key={index}
                    icon={
                      <span className="anticon anticon-mail">#{index} </span>
                    }
                    title={list.title}
                  >
                    {list.list.map((item, itemIndex) => (
                      <Menu.Item
                        key={`${index}-${itemIndex}`}
                        onClick={onClickHandler}
                        vimeoId={item.vimeoId}
                        disabled={item.vimeoId === "" ? true : false}
                      >
                        {item.title}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ))
              : ""}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <VideoMain>
            <Breadcrumb>
              <CourseTitle>{vimeoTitle}</CourseTitle>
            </Breadcrumb>
            <div className="embed-container">
              <iframe
                src={"https://player.vimeo.com/video/" + vimeo}
                allow="autoplay; fullscreen;"
                frameborder="0"
              ></iframe>
            </div>
          </VideoMain>
        </Layout>
      </VideoLayout>
    </>
  );
};

export default Detail;
