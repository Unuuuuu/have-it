import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cards from "../components/Cards";

import SortButton from "../components/SortButton";
import { hidePopupAction } from "../store/actions";

const Main = styled.div`
  overflow: scroll;
  height: calc(100vh - 96px);
`;

const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-lightblue--02);
  border-radius: 10px;
  width: auto;
  height: 48px;
  margin: 5px 40px;
  padding: 0rem 1rem;
  margin: 1.5rem 2.5rem 0rem 2.5rem;
`;

const HidePopup = styled.div`
  font-size: "16px";
  color: var(--color-mainblue);
`;

const Container = styled.div`
  width: calc(100vw - 80px);
  height: 40px;
`;

const MoreCards = styled(Cards)`
  margin: 80px;
`;

const HomeMore = () => {
  const { isPopup } = useSelector(({ homeReducer }) => homeReducer);
  const dispatch = useDispatch();
  const handlePopupClose = () => {
    dispatch(hidePopupAction);
  };

  const name = useParams();
  console.log(name);

  return (
    <Main>
      {isPopup && (
        <Popup>
          <>📣 카드를 클릭하면 채널에 참여할 수 있어요. 마음에 드는 채널을 골라 참여해보세요!</>
          <HidePopup onClick={handlePopupClose}>
            <i className="icon-cancel" />
          </HidePopup>
        </Popup>
      )}
      <SortButton />
      <Container />
      <MoreCards />
    </Main>
  );
};

export default HomeMore;
