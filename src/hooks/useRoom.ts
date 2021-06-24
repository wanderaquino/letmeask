import { useEffect, useState } from "react";
import { firebaseDb } from "../services/firebase";

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
};

type FirebaseQuestion = Record <string, {
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}>

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const roomRef = firebaseDb.ref(`/rooms/${roomId}`);
        
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
        }, [roomId]);
    });
    return {questions, title};
}