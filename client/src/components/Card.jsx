import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: var(--color-white);
`;

const Icon = styled.div`
  flex: 0;
  margin: 0;
  font-size: 2rem;
`;

const Title = styled.div`
  flex: 1 1 0;
  margin: 0.75rem 0;
  font-family: Interop-SemiBold;
  font-size: 1.25rem;
`;

const Info = styled.div`
  flex: 0;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Users = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row-reverse;
  width: fit-content;
`;

const Profile = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  margin-right: -0.25rem;
  color: var(--color-midgray);
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  filter: drop-shadow(0 0 6px var(--color-shadow));

  ::before {
    margin-top: 0.2rem;
  }
`;

const More = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  margin-right: -0.25rem;
  color: var(--color-white);
  border: 1px solid var(--color-white);
  background-color: var(--color-blur);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  filter: drop-shadow(0 0 12px var(--color-blurshadow));
`;

const Count = styled.div`
  flex: 0 0 1;
  margin-left: 0.75rem;
  font-family: Interop-SemiBold;
  font-size: 1rem;
  height: 1.15rem;
`;

export default function Card() {
  return (
    <CardContainer>
      <Icon>🚲</Icon>
      <Title>자전거 같이 타면,얼마나 재밌게요~? 😆</Title>
      <Info>
        <Users>
          <More className="icon-dot-3" />
          <Profile className="icon-user" />
          <Profile className="icon-user" />
          <Profile className="icon-user" />
          <Profile className="icon-user" />
        </Users>
        <Count>1500명 참여중</Count>
      </Info>
    </CardContainer>
  );
}
