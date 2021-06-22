import {Button} from "../components/Button";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import  "../styles/auth.scss";
import { Link } from "react-router-dom";

export function NewRoom() {

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
                <h2>Criar uma nova sala</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Nome da Sala"
                    />
                <Button type="submit">Criar sala</Button>
                </form>
                <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
            </div>
        </main>
    </div>
    );
}