import { useHistory } from "react-router";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import  "../styles/auth.scss";

import {Button} from "../components/Button";
import { useAuth } from "../hooks/useAuths";
import { FormEvent, useState } from "react";
import { firebaseDb } from "../services/firebase";


export function Home () {
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState("");
    
    function handleCreateRoom() {
        if(!user) {
            signInWithGoogle();
        }

        history.push("/rooms/new");
    };

    async function handleJoinRoom(event: FormEvent) {
        event?.preventDefault();
        if(roomCode.trim() === "") {
            return;
        };

        const roomRef = await firebaseDb.ref(`/rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert("Room not exists");
            return;
        };

        history.push(`/rooms/${roomCode}`);
    };

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Imagem do logo LetmeAsk"></img>
                    <button className="create-room-google" onClick={handleCreateRoom}>
                        <img src={googleImg} alt="Ícone do Google"></img>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                    <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}