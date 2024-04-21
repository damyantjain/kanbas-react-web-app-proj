import { createSlice } from "@reduxjs/toolkit";
interface Quiz {
  title: string;
  description: string;
  availability: string;
  points: string;
  dueDate: string;
  _id: string;
  quizType: string;
  assignmentGroup: string;
  instructions: string;

  shuffleAnswers: boolean;
  timeLimit: String;
  multipleAttempts: boolean;
  correctAnswers: boolean;
  oneQuestion: boolean;
  webcam: boolean;
  lockQuestion: boolean;

  accessCode: String;

  numberOfQuestions: string;
  availableFromDate: string;
  availableUntilDate: string;
  course: String;
  published: Boolean;
}
const initialState = {
  quizzes: [] as Quiz[],
  quiz: {
    instructions:"",
    title: "Unnamed Quiz",
    availability: "",
    description: "",
    numberOfQuestions: "",
    _id: "-1",
    points: "100",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",

    shuffleAnswers: true,
    timeLimit: "20",
    multipleAttempts: false,
    correctAnswers: true,
    oneQuestion: true,
    webcam: false,
    lockQuestion: false,

    accessCode: "",
    dueDate: new Date().toISOString().slice(0, 10),
    availableFromDate: new Date().toISOString().slice(0, 10),
    availableUntilDate: new Date().toISOString().slice(0, 10),
    course: "-1",
    published: false,
  },
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
      state.quiz = initialState.quiz;
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz?._id === action.payload._id) {
          console.log(quiz._id);
          console.log(action.payload);
          return { ...quiz, ...action.payload };
        } else {
          return quiz;
        }
      });
    },

    // updateQuiz: (state, action) => {
    //   const temp=state.quizzes.map((quiz) => {
    //     if (quiz?._id === action.payload._id) {
    //       console.log(quiz._id);
    //       console.log(action.payload);
    //       return { ...quiz, ...action.payload };
    //     } else {
    //       return quiz;
    //     }
    //   });
    //   console.log("teemo",temp)
    //      state.quizzes = temp;
    // },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },

    clearQuiz: (state) => {
      state.quiz = initialState.quiz;
    },

    setQuiz: (state, action) => {
      console.log("setquiz call",action.payload)
      state.quiz = action.payload;
    },
    setQuizzes: (state, action) => {
     
      state.quizzes = action.payload;
    },
  },
});
export const {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  clearQuiz,
  setQuiz,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
