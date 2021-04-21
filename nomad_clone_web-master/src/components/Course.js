import React from "react";
import { Link } from "react-router-dom";
import { CourseBox } from "./style";
const Course = ({ list }) => {
  return (
    <>
      <Link to={`/courses/${list.id}`}>
        <CourseBox>
          <span className="courseLevel">{list.level}</span>
          <div className="courseImageWrapper">
            <img src={list.previewImage.url} alt="preViewImage" />
            <div>
              <h3>{list.title}</h3>
              <p>{list.subTitle}</p>
            </div>
          </div>
        </CourseBox>
      </Link>
    </>
  );
};
export default Course;
