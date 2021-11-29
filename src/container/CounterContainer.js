import React, { useCallback } from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "../modules/counter";

/**
const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <>
      <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    </>
  );
};
 */

/*
const mapStateToProps = (state) => {
  return { number: state.counter.number };
};

const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});
*/

/*
export default connect(
  (state) => ({ number: state.counter.number }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
*/

/*
export default connect((state) => ({ number: state.counter.number }), {
    increase,
    decrease,
  })(CounterContainer);
*/

//이게 훨 편하네
const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
