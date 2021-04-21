import styled from "styled-components";
import { Button } from "antd";

// Home - Hero
export const HomeHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 129px 0;
  h1.heroHeading {
    color: #111827;
    font-size: 64px;
    font-weight: 600;
    line-height: 1;
    margin: 0;
  }
  h1.heroHeading-blue {
    color: #2563eb;
  }
  p {
    margin: 20px 0 40px;
    text-align: center;
    color: #8d939d;
    line-height: 1.5;
    font-size: 20px;
  }
  button {
    background: #3b82f6;
    border: none;
    padding: 12px 40px;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
  }
`;
// Home - Hero - Button
export const HeroButton = styled(Button)`
  height: 50px;
`;

// Home - Courses
export const HomeCourses = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  row-gap: 70px;
  margin-bottom: 100px;
`;

// Home - Courses - Button
export const HomeToCourses = styled.div`
  text-align: center;
  margin-bottom: 150px;
  a {
    color: #2563eb;
    font-size: 18px;
    font-weight: bold;
  }
`;

// Home - Challenges
export const HomeChallenges = styled.div`
  padding: 50px 0;
  div.challenges-Heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
    h1 {
      line-height: 1;
      font-size: 36px;
      font-weight: bold;
    }
    p {
      line-height: 1;
      font-size: 20px;
      color: #6b7280;
    }
  }
  div.challenges-boxs {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px;
  }
  p.HomeToChallenges {
    padding: 30px 0;
    text-align: center;
    a.HomeToChallengesLink {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
