import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";

export function Room () {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt=""></img>
                    <div> Codigo da Sala</div>
                </div>
                <main className="content">
                    <div className="room-title">
                        <h1>Sala React</h1>
                        <span>4 perguntas</span>
                    </div>

                    <form>
                        <textarea
                        placeholder="O que você quer perguntar?"
                        />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit" >Enviar sua pergunta</Button>
                    </div>
                    </form>
                </main>
            </header>
        </div>
    )
}