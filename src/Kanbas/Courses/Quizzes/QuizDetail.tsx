import { FaCheckCircle, FaEllipsisV, FaPencilAlt, FaBan } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setQuiz, updateQuiz } from "./reducer";
import { useEffect, useState } from "react";
import * as client from "./QuizEditor/Questions/client";
import { setQuestions } from "./QuizEditor/Questions/reducer";

function QuizDetail() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [published, setPublished] = useState(false);

  const dispatch = useDispatch();

  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };


  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await client.getAllQuestions(quizId);
      dispatch(setQuestions(questions));
    };
    fetchQuestions();
  }, [quizId]);

  const handleTogglePublish = () => {
    // Toggle the published status
    dispatch(
      updateQuiz({
        ...quiz,
        published: !quiz.published,
      })
    );
    console.log("Publishing or Unpublishing the quiz");
    console.log(quiz.published);
  };

  return (
    <div className="flex-fill">
      <div className="d-flex justify-content-end">
        <Link
          to={"#"}
          style={{ backgroundColor: "green", color: "white" }}
          className="btn btn-secondary btn-md ps-2 ms-2"
          onClick={handleTogglePublish}
        >
          {quizList[0]?.published ? "Unpublish" : "Publish"}{" "}
          {quizList[0]?.published ? <FaBan /> : <FaCheckCircle />}
        </Link>

        <Link
          to={`QuizPreview`}
          style={{ backgroundColor: "#d3d3d3", color: "black" }}
          className="btn btn-secondary btn-md ps-2 ms-2"
        >
          Preview
        </Link>

        <Link
          to={`QuizEditor`}
          style={{ backgroundColor: "#d3d3d3", color: "black" }}
          className="btn btn-secondary btn-md ps-2 ms-2"
          role="button"
        >
          <FaPencilAlt />
          Edit
        </Link>

        <Link
          to={"#"}
          style={{ backgroundColor: "#d3d3d3", color: "black" }}
          className="btn btn-secondary btn-md ms-2"
          role="button"
        >
          <FaEllipsisV />
        </Link>
      </div>

      <hr></hr>
      <div className="d-flex justofy-content-start">
        <h2>{quiz.title}</h2>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "0.7px", paddingRight: "15px" }}
        >
          <b>Quiz Type</b>
        </div>
        <div className="col-sm-1 col-md-2">
          {quiz.quizType}
        
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Points</b>
        </div>
        <div className="col-sm-1 col-md-2">
          {quiz.points}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Assignment Group</b>
        </div>
        <div className="col-sm-1 col-md-2">
          {quiz.assignmentGroup}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Shuffle Answers</b>
        </div>
        <div className="col-sm-1 col-md-2">
  {quiz.shuffleAnswers ? 'Yes' : 'No'}
</div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Time Limit</b>
        </div>
        <div className="col-sm-1 col-md-2">
          {quiz.timeLimit}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Multiple Attempts</b>
        </div>
        <div className="col-sm-1 col-md-2">
        {quiz.multipleAttempts ? 'No' : 'Yes'}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>View Responses</b>
        </div>
        <div className="col-sm-1 col-md-2">
          Always
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Show Correct Answers</b>
        </div>
        <div className="col-sm-1 col-md-2">
          {quiz.correctAnswers ? 'Yes' : 'No'}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>One Question at a Time</b>
        </div>
        <div className="col-sm-1 col-md-2">
        {quiz.oneQuestion ? 'Yes' : 'No'}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Require Respondus LockDown Browser</b>
        </div>
        <div className="col-sm-1 col-md-2">
          No
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Required to View Quiz Results</b>
        </div>
        <div className="col-sm-1 col-md-2">
          No
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Webcam Required</b>
        </div>
        <div className="col-sm-1 col-md-2">
        {quiz.oneQuestion ? 'No' : 'Yes'}
        </div>
      </div>

      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          <b>Lock Questions After Answering</b>
        </div>
        <div className="col-sm-1 col-md-2">
        {quiz.lockQuestion ? 'No' : 'Yes'}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)} at {formatTime(quiz.dueDate)} </td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableFromDate)} at {formatTime(quiz.availableFromDate)}</td>
            <td>{formatDate(quiz.availableUntilDate)} at {formatTime(quiz.availableUntilDate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuizDetail;
