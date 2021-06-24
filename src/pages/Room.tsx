import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import "../styles/room.scss";
import {useParams} from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuths";
import { firebaseDb } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";


type RoomParams = {
    id: string
}

export function Room () {
    const {user} = useAuth();
    const params = useParams <RoomParams> ();
    const [newQuestion, setNewQuestion] = useState("");
    const {title,questions} = useRoom(params.id);

    async function handleSendQuestion (event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim()==="") {
            return;
        }
        if(!user) {
            throw new Error("Need to login");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await firebaseDb.ref(`rooms/${params.id}/questions`).push(question);
        console.log(`Success ${newQuestion}`);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk"></img>
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main className="page-room-main">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">
                    {   user ? 
                        (<div className="user-info">
                            <img src={user.avatar} alt="Nome do usuário" />
                            <span>{user.name}</span>
                        </div>) : 
                        (<span>Para enviar uma pergunta, <button>faça seu login</button></span>) }
                        <Button type="submit" disabled={!user} onClick={handleSendQuestion}>Enviar sua pergunta</Button>
                    </div>
                </form>
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