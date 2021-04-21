import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userPayGetRequestAction } from "../reducers/pay";

const DashBoardCourse = styled(Card)`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  a {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 10px;
    div {
      width: 400px;
      height: 250px;
      img {
        flex: 1;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    div {
      flex: 1;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const DashboardCourses = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPayGetRequestAction(match));
  }, []);

  const { userPayList } = useSelector((state) => state.pay);

  console.log("구매데이터는?", userPayList);
  return (
    <div>
      <DashBoardCourse>
        {userPayList !== null
          ? userPayList.map((list) => (
              <>
                {list.course !== null ? (
                  <>
                    <Link to={`/video/${list.course.video.id}`}>
                      <div>
                        <img
                          src={
                            list.course !== null
                              ? list.course.previewImage.url
                              : null
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <h2>{list.course.title}</h2>
                        <h3>{list.course.title}</h3>
                        <p></p>
                      </div>
                    </Link>
                  </>
                ) : null}
              </>
            ))
          : null}
      </DashBoardCourse>
    </div>
  );
};

export default DashboardCourses;
