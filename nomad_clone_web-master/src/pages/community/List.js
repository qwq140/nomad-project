import { Button, Menu } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommunityItem from "../../components/CommunityItem";
import { PageHero } from "../../components/style";
import {
  communityGetRequestAction,
  loadPostsRequestAction,
} from "../../reducers/community";
import {
  CommunityBoard,
  CommunityCategory,
  CommunityContainer,
  CommunityWriteButton,
  CommunityWrite,
  CommunityBoardContainer,
  SortMenu,
} from "./style";
import {
  LineChartOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import AppLayout from "../../components/AppLayout";
import {
  categoryGetRequestAction,
  categoryPostRequestAction,
} from "../../reducers/category";
import CategoryBtn from "../../components/AdminCategoryBtn";

const Community = () => {
  const dispatch = useDispatch();
  const { principal } = useSelector((state) => state.user);
  const { communityList, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.community
  );
  const { categoryList, categoryPostDone, categoryPostLoading } = useSelector(
    (state) => state.category
  );
  const [title, setTitle] = useState("# all");
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const data = {
      sort,
      categoryId,
      page,
    };
    dispatch(categoryGetRequestAction()); // 초기 카테고리 리스트 가져오기
    dispatch(communityGetRequestAction(data)); // 초기 글 목록 가져오기
  }, []);
  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 250
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          setPage((prev) => prev + 1);
          const data = {
            sort,
            categoryId,
            page: page + 1,
          };
          dispatch(loadPostsRequestAction(data));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, communityList, page]);

  const onClickCategory = useCallback(
    ({ domEvent, key }) => {
      setTitle(domEvent.target.textContent);
      setPage(0);
      setCategoryId(key);
      const data = {
        sort,
        categoryId: key,
        page: 0,
      };
      dispatch(communityGetRequestAction(data));
    },
    [sort, dispatch]
  );
  const onClickSort = useCallback(
    ({ key }) => {
      setSort(key);
      setPage(0);
      const data = {
        sort: key,
        categoryId,
        page: 0,
      };
      dispatch(communityGetRequestAction(data));
    },
    [categoryId, dispatch]
  );

  return (
    <>
      <AppLayout>
        <PageHero>
          <h1>Community</h1>
          <p>개발자 99% 커뮤니티에서 수다 떨어요!</p>
          <p>{title}</p>
        </PageHero>

        <CommunityContainer justify="center">
          {/* 카테고리 */}
          <CommunityCategory span={5}>
            <h3>카테고리</h3>
            <Menu mode="vertical" defaultSelectedKeys={["0"]}>
              <Menu.Item key={0} onClick={onClickCategory}>
                # all
              </Menu.Item>
              {categoryList.map((list) => (
                <>
                  <Menu.Item key={list.id} onClick={onClickCategory}>
                    {"# " + list.title}
                  </Menu.Item>
                </>
              ))}
            </Menu>
            {principal !== null && principal.roles === "ROLE_ADMIN" && (
              <CategoryBtn
                action={categoryPostRequestAction}
                done={categoryPostDone}
                loading={categoryPostLoading}
              />
            )}
          </CommunityCategory>
          {/* 중앙 Board */}
          <CommunityBoard span={14}>
            <div className="Community-Filter">
              <div>
                <b>Sort by: </b>
                <SortMenu mode="horizontal" defaultSelectedKeys={["new"]}>
                  <Menu.Item
                    key={"popular"}
                    icon={<LineChartOutlined />}
                    onClick={onClickSort}
                  >
                    Popular
                  </Menu.Item>
                  <Menu.Item
                    key={"new"}
                    icon={<ThunderboltOutlined />}
                    onClick={onClickSort}
                  >
                    New
                  </Menu.Item>
                </SortMenu>
              </div>
              <div>
                <Button size="small" type="text" icon={<SearchOutlined />}>
                  Search
                </Button>
              </div>
            </div>
            <CommunityBoardContainer>
              {communityList.map((list) => (
                <>
                  <CommunityItem key={"list-" + list.id} list={list} />
                </>
              ))}
            </CommunityBoardContainer>
          </CommunityBoard>
          {/* 글쓰기 버튼 */}
          <CommunityWrite span={5}>
            <CommunityWriteButton type="primary">
              <Link to="/write">글쓰기</Link>
            </CommunityWriteButton>
          </CommunityWrite>
        </CommunityContainer>
      </AppLayout>
    </>
  );
};

export default Community;
