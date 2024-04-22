import axios from "axios";

const API_BASE = "http://localhost:4000";
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const findQuizForCourse = async (courseId: string | undefined) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuiz = async (
  courseId: string | undefined,
  quiz: string
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export function getQuestionById(quizId: string | undefined) {
  throw new Error("Function not implemented.");
}

