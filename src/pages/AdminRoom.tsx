import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import "../styles/room.scss";
import {useParams} from "react-router-dom";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";


type RoomParams = {
    id: string
}

export function AdminRoom () {
    const params = useParams <RoomParams> ();
    const {title,questions} = useRoom(params.id);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk"></img>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined>Encerrar a Sala</Button>
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
                    <Question key={question.id} content={question.content} author={question.author}></Question>
                    )
                    }))}
                </div>
            </main>
        </div>
    )
}