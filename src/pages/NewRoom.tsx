import {Button} from "../components/Button";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import  "../styles/auth.scss";
import { Link } from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import {useContext, useState, FormEvent} from "react";
import {useHistory} from "react-router";
import { firebaseDb } from "../services/firebase";


export function NewRoom() {
    const {user} = useContext(AuthContext);
    const [newRoom, setNewRoom] = useState("");
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if (newRoom.trim() === "") {
            return;
        }
        
        const roomRef = firebaseDb.ref("rooms"); 
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
        console.log(`Success!!! ${firebaseRoom}`);

        history.push(`/rooms/${firebaseRoom.key}`);
    }

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
                <h1>{user?.name}</h1>
                <h2>Criar uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input
                        type="text"
                        placeholder="Nome da Sala"
                        onChange={(event) => setNewRoom(event.target.value)}
                    />
                <Button type="submit">Criar sala</Button>
                </form>
                <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
            </div>
        </main>
    </div>
    );
}