import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import "../styles/room.scss";
import {useParams} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuths";
import { firebaseDb } from "../services/firebase";


type RoomParams = {
    id: string
}

export function Room () {
    const {user} = useAuth();
    const params = useParams <RoomParams> ();
    const [newQuestion, setNewQuestion] = useState("");
    
    async function handleSendQuestion () {
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

        await firebaseDb.ref(`rooms/${params.id}/questions`);
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
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit" >Enviar sua pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}