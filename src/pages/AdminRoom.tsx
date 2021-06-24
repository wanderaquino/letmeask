import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { Button } from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import "../styles/room.scss";
import {useHistory, useParams} from "react-router-dom";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { firebaseDb } from "../services/firebase";


type RoomParams = {
    id: string
}

export function AdminRoom () {
    const history = useHistory();
    const params = useParams <RoomParams> ();
    const roomId = params.id;
    const {title,questions} = useRoom(params.id);

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm("Tem certeza que deseja remover a pergunta?")) {
            await firebaseDb.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
            console.log(`Question ${questionId} removed.`);
        }
    }
    async function handleEndRoom(roomId: string) {
            await firebaseDb.ref(`/rooms/${roomId}`).update({
                endedAt: new Date()
            });
            console.log(`Room ${roomId} removed.`);
            history.push("/");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk"></img>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined onClick={()=> handleEndRoom(roomId)}>Encerrar a Sala</Button>
                    </div>
                </div>
            </header>

            <main className="page-room-main">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <div className="question-list">
                {questions.map((question => {
                    return(
                    <Question 
                        key={question.id} 
                        content={question.content} 
                        author={question.author}>
                            <button 
                                onClick={() => handleDeleteQuestion(question.id)}
                                type="button">
                                <img src={deleteImg} alt="Remover Pergunta"/>
                            </button>
                    </Question>
                    )
                    }))}
                </div>
            </main>
        </div>
    )
}