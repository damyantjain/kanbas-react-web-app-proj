import { Routes, Route, Navigate, useParams, useNavigate } from "react-router";
import Nav from "./nav";
import QuizQuestion from "./Questions";
import QuizDetail from "./Details";
import QuestionEditor from "./Questions/QuestionEditor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import {
  addQuiz,
  updateQuiz,
  clearQuiz,
  setQuiz
} from "../reducer";
import Quiz from "../..";
import * as client from "../client";
import { Button } from "react-bootstrap";
import { updateText } from "../../../Common/TextBox/reducer";


function QuizEditor() {
 
  const { quizId } = useParams();
  const isAddNew = quizId === "QuizDetail";
    const {courseId}=useParams();
    const navigate = useNavigate();
    const quiz = useSelector(
      (state: KanbasState) => {
        console.log("text handle save,",state.quizReducer.quizzes[0]);
        return state.quizReducer.quizzes[0]}
    );

    const text = useSelector(
      (state: KanbasState) => state.textReducer.text.instructions
    );

    

 


    const handleSave = () => {
        console.log("text handle save,",quiz);
  //      new Promise((resolve,reject)=>{
        const quizTemp ={...quiz, instructions: text}
        dispatch(updateQuiz({quizTemp
        }
      ))
        handleUpdate(quizTemp)
        // setTimeout(handleUpdate,2000)
      //   setTimeout(()=>resolve(true),2000)
      // }).then(()=>handleUpdate());
        navigate(`/Kanbas/Courses/${courseId}/quizzes`);
      };

      const handleSaveAndPublish = () => {
        console.log("Actually saving assignment TBD in later assignments");
        handleAddingNew();
        navigate(`/Kanbas/Courses/${courseId}/quizzes`);
      };

    const dispatch = useDispatch();

  const handleAddingNew = () => {
    client
      .createQuiz(courseId, quiz)
      .then((q) => dispatch(addQuiz(q)));
  };

  const handleUpdate = async (quizTemp:object) => {
    // const quiz2 = useSelector(
    //   (state: KanbasState) => {
    //     console.log("text handle save,",state.quizReducer.quizzes[0]);
    //     return state.quizReducer.quizzes[0]}
    // );
    console.log("new",)
    const res = await client.updateQuiz(quizTemp);
    dispatch(updateQuiz(quizTemp));
  
  };




  return (
    <div>
      <h2>Hello</h2>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="details" />} />
        <Route path="details" element={<QuizDetail />} />
        <Route path="questions" element={<QuizQuestion />} />
      </Routes>
      <br /><br /><hr style={{ marginLeft: "10px" }} />
    <div style={{ marginLeft: "10px" }}>
        <div className="d-flex justify-content-between" style={{ paddingTop: "15px" }}>
          <span style={{ marginLeft: "10px", paddingTop: "5px" }}>
            <input type="checkbox" />
            Notify users that this content has changed
          </span>
          <span>

          
        
        
            <Link to={`/Kanbas/Courses/${courseId}/quizzes`}
               onClick={(e) => dispatch(clearQuiz())}
              className="btn me-2" style={{ height: "fit-content", backgroundColor: "#E0E0E0" }}
            >
              Cancel
            </Link>
            <Link to={`/Kanbas/Courses/${courseId}/quizzes`}
              onClick={handleSaveAndPublish}
              className="btn me-2" style={{ height: "fit-content", backgroundColor: "#E0E0E0" }}
            >
              Save and Publish
            </Link>

           <Button className="btn btn-danger" style={{ marginRight: "5px" }}  onClick={handleSave}>
  Save
</Button>
          </span>
        </div>

        <hr style={{ marginLeft: "10px" }} />
      </div>
    </div>
  );
}
export default QuizEditor;
