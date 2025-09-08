import {ArtistAlbumType} from "@/api/artists/types";
import {ANSWERS_LIMIT} from "@/constants";

export const getRandomSelection = (length: number, used: number[]): number | null => {
    const available = Array.from({ length }, (_, i) => i).filter(n => !used.includes(n));
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
};

export const generateAnswerButtons = (albums: ArtistAlbumType[], correctQuestionId: number): number[] => {
    const answers = new Set<number>();
    answers.add(correctQuestionId);

    while (answers.size < ANSWERS_LIMIT) {
        const randomIndex = Math.floor(Math.random() * albums.length);
        answers.add(randomIndex);
    }

    return Array.from(answers).sort(() => Math.random() - 0.5);
}