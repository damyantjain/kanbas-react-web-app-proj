import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
import quizReducer from "../Courses/Quizzes/reducer";
import questionsReducer from "../Courses/Quizzes/QuizEditor/Questions/reducer";
import textReducer from "../Common/TextBox/reducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentReducer:{
    assignments: any[];
    assignment: any;
  };
  quizReducer:{
    quizzes: any[];
    quiz: any;
  };
  questionsReducer: {
    questions: any[];
    question: any;
  };
  textReducer: {
    texts: any[];
    text: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    quizReducer,
    questionsReducer,
    textReducer
  }
});


export default store;