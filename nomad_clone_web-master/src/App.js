import { Route, Switch, useLocation } from "react-router-dom";

import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import Courses from "./pages/courses/Courses";
import Challenges from "./pages/challenges/Challenges";
import Community from "./pages/community/List";
import FAQ from "./pages/faq/FAQ";

import Write from "./pages/community/Write";
import FaqDetail from "./pages/faq/FaqDetail";
import CommunityDetail from "./pages/community/Detail";
import DashBoard from "./pages/user/DashBoard";
import EditProfile from "./pages/user/EditProfile";
import UploadTest from "./pages/test/UploadTest";
import CoursesWrite from "./pages/admin/courses/CoursesWrite";
import CoursesDetail from "./pages/courses/CoursesDetail";
import FaqWrite from "./pages/admin/faq/FaqWrite";
import FolderList from "./pages/admin/video/FolderList";
import FolderDetail from "./pages/admin/video/FolderDetail";
import FaqUpdate from "./pages/admin/faq/FaqUpdate";
import VideoList from "./pages/video/Detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMyInfoRequestAction, logoutRequestAction } from "./reducers/user";

import Purchase from "./pages/courses/Purchase";
import AdminTechList from "./pages/admin/tech/List";
import AdminPayList from "./pages/admin/pay/List";
import Enroll from "./pages/courses/Enroll";
import AndroidVimeo from "./pages/test/AndroidVimeo";
import ChannelService from "./api/ChannelService";

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { loadMyInfoError } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // 새로고침 시 유저 인포 다시 가져오기
  useEffect(() => {
    // if (localStorage.getItem("nomadToken")) {
    dispatch(loadMyInfoRequestAction());
    // }
  }, []);
  ChannelService.boot({
    pluginKey: "2f146489-45bb-46cc-a6d6-74aa3b8b77be", //please fill with your plugin key
  });
  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/join" exact={true} component={Join} />
        <Route path="/courses" exact={true} component={Courses} />
        <Route path="/courses/:id" exact={true} component={CoursesDetail} />

        <Route path="/challenges" exact={true} component={Challenges} />
        <Route path="/community" exact={true} component={Community} />
        <Route
          path="/communityDetail/:id"
          exact={true}
          component={CommunityDetail}
        />
        <Route path="/faq" exact={true} component={FAQ} />
        <Route path="/faq/:id" exact={true} component={FaqDetail} />
        <Route path="/write" exact={true} component={Write} />
        <Route path="/dashboard/:id" exact={true} component={DashBoard} />
        <Route path="/editProfile/:id" exact={true} component={EditProfile} />
        <Route path="/upload" exact={true} component={UploadTest} />
        <Route path="/admin/faq/write" exact={true} component={FaqWrite} />
        <Route
          path="/admin/faq/update/:id"
          exact={true}
          component={FaqUpdate}
        />
        <Route path="/video/:id" exact={true} component={VideoList} />
        <Route path="/admin/video" exact={true} component={FolderList} />
        <Route path="/admin/video/:id" exact={true} component={FolderDetail} />
        <Route path="/admin/courses" exact={true} component={CoursesWrite} />
        <Route path="/purchase/:id" exact={true} component={Purchase} />
        <Route path="/enroll/:id" exact={true} component={Enroll} />
        <Route path="/admin/techList" exact={true} component={AdminTechList} />
        <Route path="/admin/pay/list" exact={true} component={AdminPayList} />
        <Route
          path="/android/video/:id"
          exact={true}
          component={AndroidVimeo}
        />
      </Switch>
    </>
  );
};

export default App;
