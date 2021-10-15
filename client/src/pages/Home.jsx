import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Cards from "../components/Cards";
import CategoryList from "../components/CategoryList";
import { signInAction, signOutAction, hidePopupAction } from "../store/actions";
import authApi from "../api/auth";
import habitsApi from "../api/habits";

const Main = styled.div`
  overflow: scroll;
  max-height: calc(100vh - 6rem);
`;

const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-lightblue--02);
  border-radius: 10px;
  min-height: 3rem;
  margin: 0.5rem 2.5rem;
  padding: 0rem 1rem;
  margin: 1.5rem 2.5rem 0rem 2.5rem;
`;

const Title = styled.div`
  font-weight: var(--fontWeight-bold);
  color: var(--color-black);
  margin: 2rem 2.5rem -1.25rem 2.5rem;
  font-size: 1.5rem;
`;

const CategoryListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 2.5rem -1rem 2.5rem;
`;

const CardContainer = styled.div`
  padding: 40px;
`;

const ViewMore = styled.button`
  font-size: 1.25rem;
  color: var(--color-mainblue);
  height: 1.25rem;
`;

const HidePopup = styled.button`
  background: none;
  font-size: 1rem;
  color: var(--color-mainblue);
`;

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isPopup } = useSelector(({ homeReducer }) => homeReducer);
  const [selectCategory, setSelectCategory] = useState({
    id: 1,
    title: "💪🏻 운동",
    enTitle: "exercise",
  });
  const [trendingHabits, setTrendingHabits] = useState([]);
  const [habitsByCategory, setHabitsByCategory] = useState([]);

  useEffect(() => {
    const checkValidUser = async () => {
      const res = await authApi.me();
      if (res.status === 200) {
        dispatch(signInAction(res.data.data));
      } else if (res.status === 202) {
        dispatch(signOutAction);
        history.push("/");
      }
    };
    checkValidUser();
  }, [dispatch, history]);

  const handlePopupClose = () => {
    dispatch(hidePopupAction);
  };

  const handleCategoryClick = useCallback(
    (category) => {
      setSelectCategory(category);
    },
    [setSelectCategory]
  );

  useEffect(() => {
    const getTrendingHabits = async () => {
      const res = await habitsApi.findHabits(null, 5, "sortByUserCount");
      setTrendingHabits(res.data.data);
    };
    getTrendingHabits();
  }, []);

  useEffect(() => {
    const getHabitsByCategory = async () => {
      const res = await habitsApi.findHabits(selectCategory.enTitle, 10, "sortByUserCount");
      setHabitsByCategory(res.data.data);
    };
    getHabitsByCategory();
  }, [selectCategory]);

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

      <>
        <Title>지금 뜨는 습관</Title>
        <CardContainer>
          <Cards isAtHome habits={trendingHabits} />
        </CardContainer>
        <CategoryListContainer>
          <CategoryList isAtHome handleCategoryClick={handleCategoryClick} />
          <Link to={`/more/${selectCategory.enTitle}`}>
            <ViewMore>
              더보기
              <i className="icon-right-open" style={{ fontSize: "20px", color: "#4D4DFF" }} />
            </ViewMore>
          </Link>
        </CategoryListContainer>
        <CardContainer>
          <Cards isAtHome habits={habitsByCategory} />
        </CardContainer>
      </>
    </Main>
  );
};

export default Home;
