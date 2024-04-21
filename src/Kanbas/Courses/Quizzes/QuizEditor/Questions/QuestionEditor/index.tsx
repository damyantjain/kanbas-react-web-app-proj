import { useEffect, useState } from "react";
import TextBox from "../../../../../Common/TextBox";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import FillInTheBlank from "./FillInTheBlank";
import TrueFalse from "./TrueFalse";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, setQuestion, addOption } from "../reducer";
import { KanbasState } from "../../../../../store";
import * as client from "../client";

function QuestionEditor() {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();

  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState("MultipleChoice");
  const [currentQuestionType, setCurrentQuestionType] = useState(<></>);

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  useEffect(() => {
    //setQuestionType(question.type);
    checkType();
  }, [questionType]);

  useEffect(() => {
    console.log("Question Updated", question);
    setQuestionType(question.type);
    checkType();
  }, []);

  const updateQuestion = async () => {
    console.log("Updating Question", question);
    var response = await client.updateQuestion(question);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`);
    //navigate back to the question list
  };

  const checkType = () => {
    let temp = <></>;
    if (questionType.includes("MultipleChoice")) {
      temp = <MultipleChoiceQuestion />;
    } else if (questionType.includes("TrueFalse")) {
      temp = <TrueFalse />;
    } else {
      temp = <FillInTheBlank />;
    }
    setCurrentQuestionType(temp);
  };

  return (
    <div>
      <div className="col">
        <input
          className="form"
          type="text"
          placeholder="Question Name"
          value={question.title}
          onChange={(e) => {
            dispatch(setQuestion({ ...question, title: e.target.value }));
          }}
        />
        <select
          className="form"
          value={questionType}
          onChange={(e) => {
            console.log("Hello");
            setQuestionType(e.target.value);
            dispatch(setQuestion({ ...question, type: e.target.value }));
            dispatch(setQuestion({ ...question, options: [] }));
          }}
        >
          <option value="MultipleChoice">Multiple Choice</option>
          <option value="TrueFalse">True/False</option>
          <option value="FillBlank">Fill in the Blank</option>
        </select>
        <span
          className="float-end"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          pts:
          <input
            value={question.points}
            onChange={(e) => {
              dispatch(setQuestion({ ...question, points: e.target.value }));
            }}
            className="form ms-1"
            style={{ width: "50px" }}
            type="number"
          />
        </span>
      </div>
      <hr />
      <p>
        Enter your question text, then define all possible correct answers for
        the blank.
        <br />
        Students will see the question followed by a small text box to type
        their answer.
      </p>
      <h2>Question:</h2>
      {/*<TextBox />*/ }
      {currentQuestionType}
      {!questionType.includes("TrueFalse") && (
        <div className="float-end me-2">
          <Button
            type="button"
            onClick={() => dispatch(addOption("Empty Option"))}
            style={{ color: "red", textDecoration: "none" }}
            className="btn btn-link"
          >
            <FaPlus className="me-2" style={{ color: "red" }} />
            Add Another Answer
          </Button>
        </div>
      )}

      <br />
      <Button className="btn btn-secondary">Cancel</Button>
      <Button onClick={() => updateQuestion()} className="btn btn-danger ms-2">
        Update Question
      </Button>
    </div>
  );
}

export default QuestionEditor;
