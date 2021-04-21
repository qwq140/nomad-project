import React, { useEffect } from "react";
import {
  HeroButton,
  HomeChallenges,
  HomeCourses,
  HomeHero,
  HomeToCourses,
} from "./style";
import { ArrowRightOutlined } from "@ant-design/icons";
import Course from "../../components/Course";
import { Link } from "react-router-dom";
import Challenge from "../../components/Challenge";
import { useDispatch, useSelector } from "react-redux";
import { homeCoursesGetRequestAction } from "../../reducers/courses";
import AppLayout from "../../components/AppLayout";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeCoursesGetRequestAction());
  }, []);
  const { coursesList } = useSelector((state) => state.courses);

  console.log("리미트6 코스데이터는?", coursesList);

  return (
    <>
      <AppLayout>
        <HomeHero>
          <h1 className="heroHeading">Clone Startups.</h1>
          <h1 className="heroHeading heroHeading-blue">Learn to code.</h1>

          <p>
            코딩은 진짜를 만들어보는거야! <br /> 실제 구현되어 있는 서비스를
            한땀 한땀 따라 만들면서 코딩을 배우세요.
          </p>
          <Link to="/join">
            <HeroButton type="primary" size={"large"}>
              Join Now
              <ArrowRightOutlined />
            </HeroButton>
          </Link>
        </HomeHero>

        <HomeCourses>
          {coursesList !== null
            ? coursesList.map((list) => (
                <>
                  <Course list={list} />
                </>
              ))
            : null}
        </HomeCourses>

        <HomeToCourses>
          <Link to="/courses">
            See all courses&nbsp;&nbsp;
            <ArrowRightOutlined />
          </Link>
        </HomeToCourses>

        <HomeChallenges>
          <div className="challenges-Heading">
            <h1>Challenges</h1>
            <p>
              강의만으로는 부족해! 멱살잡고 캐리하는 챌린지에 무료로 참여하세요!
            </p>
          </div>
          <div className="challenges-boxs">
            <Challenge></Challenge>
            <Challenge></Challenge>
            <Challenge></Challenge>
          </div>
          <p className="HomeToChallenges">
            <Link to="/challenges" className="HomeToChallengesLink">
              See all challenges&nbsp;&nbsp;
              <ArrowRightOutlined />
            </Link>
          </p>
        </HomeChallenges>
      </AppLayout>
    </>
  );
};

export default Home;
