import React from "react";
import AppLayout from "../../components/AppLayout";
import Challenge from "../../components/Challenge";
import { PageHero } from "../../components/style";
import { ChallengesContainer } from "./style";

const Challenges = () => {
  return (
    <>
      <AppLayout>
        <PageHero>
          <h1>Challenges</h1>
          <p>
            강의만으로는 부족해! 멱살잡고 캐리하는 챌린지에 무료로 참여하세요!
          </p>
        </PageHero>
        <ChallengesContainer>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
          <Challenge></Challenge>
        </ChallengesContainer>
      </AppLayout>
    </>
  );
};

export default Challenges;
