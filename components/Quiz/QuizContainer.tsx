import {useMemo, useState} from "react";
import {ArtistAlbumType} from "@/api/artists/types";
import {useStore} from "@/store";
import {BASE_API_URL} from "@/constants";
import {generateAnswerButtons, getRandomSelection} from "@/utils/quizHelpers";

type QuizContainerProps = {
    albums: ArtistAlbumType[];
}

export const QuizContainer = ({ albums }: QuizContainerProps) => {
    const answers = useStore((state) => state.quizAnswers);
    const addAnswer = useStore((state) => state.addQuizAnswer);
    const cleanup = useStore((state) => state.cleanup);

    const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(getRandomSelection(albums.length, answers.map((a) => a.questionId)));
    const [currentAnswerProgress, setCurrentAnswerProgress] = useState<'success' | 'fail' | undefined>();

    const onAnswerSubmit = (id: number) => {
        if (currentQuestionId === null) return;
        const currentGuesses = answers.find((a) => a.questionId === currentQuestionId);
        const newGuessesCount = currentGuesses ? currentGuesses.guessesCount + 1 : 1;
        addAnswer({ questionId: currentQuestionId, guessesCount: newGuessesCount });

        if (albums[id].name === albums[currentQuestionId].name) {
            setCurrentAnswerProgress('success')
        } else {
            setCurrentAnswerProgress('fail')
        }
    }

    const onNextQuestion = () => {
        if (currentQuestionId === null) return;

        const nextQuestionId = getRandomSelection(albums.length, [...answers.map((a) => a.questionId), currentQuestionId]);
        setCurrentQuestionId(nextQuestionId);
        setCurrentAnswerProgress(undefined);
    }

    const answerButtons = useMemo(() => currentQuestionId !== null ? generateAnswerButtons(albums, currentQuestionId) : [], [currentQuestionId])

    return (
        <div>
            <h2>Guess a name of the album:</h2>
            {currentQuestionId === null ? <div>
                <p>No more questions left!</p>
                <button onClick={cleanup}>Restart Quiz</button>
                <p>Answers:</p>
                <pre>{JSON.stringify(answers, null, 2)}</pre>
            </div> : (
                <div>
                    <img src={`${BASE_API_URL}${albums[currentQuestionId].cover_image_path}`} alt="album_preview" />
                    <div>
                        {answerButtons.map((id) => (
                            <button key={id} onClick={() => onAnswerSubmit(id)}>
                                {albums[id].name}
                            </button>
                        ))}
                    </div>
                    {currentAnswerProgress === 'success' && (
                        <div>
                            <h3>You are right!</h3>
                            <button onClick={onNextQuestion}>Next</button>
                        </div>
                    )}
                    {currentAnswerProgress === 'fail' && (
                        <div>
                            <h3>Try again please</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}