import {
  FacebookFilled,
  GithubFilled,
  InstagramOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const MyFooter = memo(() => {
  return (
    <>
      <Footer style={{ padding: "24px 50px" }}>
        <section className="footer_info">
          <div className="footer_company">
            <h4>Nomad Coders</h4>
            유한회사 노마드컴퍼니 <br />
            대표: 최주호 <br />
            개인정보책임관리자: 최주호 <br />
            사업자번호: 301-88-01666 <br />
            주소: 서울시 마포구 양화로 8길 17-28, 6층 141호 <br />- <br />
            원격평생교육원: 서울시 서부교육지원청(제2020-13호)
            <br />
            통신판매업 신고번호: 2020-서울마포-1987
            <br />
            이메일: help [@] nomadcoders.co{" "}
          </div>
          <div className="footer_navigations">
            <div className="footer_navigation">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <Link to="/courses">Coureses</Link>
                </li>
                <li>
                  <Link to="/challenges">Challenges</Link>
                </li>
                <li>
                  <Link to="/community">Community</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className="footer_legal">
              <h4>Legal</h4>
              <ul>
                <li>이용약관</li>
                <li>개인정보취급방침</li>
                <li>취소 및 환불정책</li>
              </ul>
            </div>
          </div>
          <div className="footer_mark">
            <img
              src="http://localhost:3100/images/m-gray.svg"
              alt="footer_logo"
            />
            <span>Clone Startups. Learn to Code.</span>
          </div>
        </section>
        <section className="footer_copyright">
          <p>© 2017-2021 Nomad Coders. All rights reserved.</p>
          <div>
            <div>
              <span>Instagram</span>
              <InstagramOutlined />
            </div>
            <div>
              <span>Youtube</span>
              <YoutubeFilled />
            </div>
            <div>
              <span>Facebook</span>
              <FacebookFilled />
            </div>
            <div>
              <span>GitHub</span>
              <GithubFilled />
            </div>
          </div>
        </section>
      </Footer>
    </>
  );
});

export default MyFooter;
