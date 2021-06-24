import { useEffect, useState } from "react";
import { firebaseDb } from "../services/firebase";
import { useAuth } from "./useAuths";

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
    likes: Record<string, {authorId: string}>
}>

export function useRoom(roomId: string) {
    const {user} = useAuth();
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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
                }
            });
            setTitle(dataRoom.title);
            setQuestions(parseQuestions);
            return () => {roomRef.off()}
        }, [roomId, user?.id]);
    });
    return {questions, title};
}