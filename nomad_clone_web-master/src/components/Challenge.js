import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { ChallengeBox } from "./style";

const Challenge = () => {
  return (
    <ChallengeBox>
      <h2>바닐라JS 2주 완성반</h2>
      <p>
        <span>
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        2 weeks
      </p>
      <p>
        <span>
          <svg
            class="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
        </span>
        862 challengers
      </p>
      <p>
        <span>
          <svg
            class="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"></path>
          </svg>
        </span>
        Unlocks:&nbsp;&nbsp;
        <img src="./images/js.png" alt="" />
      </p>

      <div className="starts">
        <span>Start in:</span>
        <h2>01d 21h 44m 11s</h2>
      </div>
      <Link>
        See More&nbsp;&nbsp;
        <ArrowRightOutlined />
      </Link>
    </ChallengeBox>
  );
};

export default Challenge;
