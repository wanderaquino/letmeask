import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import "../styles/room.scss";
import {useParams} from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuths";
import { firebaseDb } from "../services/firebase";
import { useEffect } from "react";


type RoomParams = {
    id: string
}

type FirebaseQuestion = Record <string, {
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}

export function Room () {
    const {user} = useAuth();
    const params = useParams <RoomParams> ();
    const [newQuestion, setNewQuestion] = useState("");
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState("");
    
    
    useEffect(() => {
        const roomRef = firebaseDb.ref(`/rooms/${params.id}`);

        roomRef.once("value", room => {
            const dataRoom = room.val();
            const firebaseQuestions: FirebaseQuestion = dataRoom.questions ?? {};
            const parseQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
                
            });
            setTitle(dataRoom.title);
            setQuestions(parseQuestions);
        }, [params.id]);
    });
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
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}