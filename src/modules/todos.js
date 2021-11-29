import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

/* 
export const changeInput = (input) => {
  return { type: CHANGE_INPUT, input };
};
let id = 3;
export const insert = (text) => {
  return {
    type: INSERT,
    todo: { id: id++, text, done: false },
  };
};

export const toggle = (id) => {
  return { type: TOGGLE, id };
};

export const remove = (id) => {
  return { type: REMOVE, id };
};
*/
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3;

export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  input: "",
  todos: [
    { id: 1, text: "리덕스 기초 배우기", done: true },
    { id: 2, text: "리액트와 리덕스 사용하기", done: false },
  ],
};

/* 
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.id ? { ...todo, done: !todo.done } : todo;
        }),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.id;
        }),
      };
    default:
      return state;
  }
}
*/
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, {payload:input}) =>
      produce(state, draft => {
        draft.input =input;
      }),
    [INSERT]: (state, action) => {
      return produce(state, draft => {
        draft.todos.push(action.payload);
      });
    },
    [TOGGLE]: (state, {payload : id}) =>
      produce(state, draft => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, {payload:id}) =>
      produce(state, draft => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState
);

export default todos;
