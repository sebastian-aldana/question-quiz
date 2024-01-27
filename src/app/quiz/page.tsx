"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";

import { Questions_data } from "@/contexts/questions";

const Quiz = () => {
  const router = useRouter();

  let { questions, setResults, setQuestions }: any = useContext(Questions_data);
  let [positionQuestion, setPositionQuestion] = useState(0);
  let [correctAnswers, setCorrectAnswer] = useState(0);
  let [answers, setAnswers]: any = useState({});

  const onQuestionAnswer = (prevPosition: number, answer: boolean) => {
    const positionQuestionPlusOne = prevPosition + 1;
    setPositionQuestion(positionQuestionPlusOne);
    checkQuestionAnswer(positionQuestionPlusOne, answer);
  };

  const checkQuestionAnswer = (position: number, answer: boolean) => {
    const isCorrectAnswer =
      questions[position]?.correct_answer.toLowerCase() === answer.toString();

    if (isCorrectAnswer) {
      const correctAnswerCounterPlusone = correctAnswers + 1;
      setCorrectAnswer(correctAnswerCounterPlusone);
    }
    saveQuestionAnswer(position, isCorrectAnswer);
  };

  const saveQuestionAnswer = (position: any, answer: any) => {
    setAnswers({ ...answers, [position - 1]: answer });
  };

  const setFinalResults = () => {
    setResults({
      correctAnswers,
      answers,
    });
  };

  const resetCounters = () => {
    setCorrectAnswer(0);
    setPositionQuestion(0);
  };

  useEffect(() => {
    resetCounters();
  }, []);

  if (positionQuestion >= questions?.length && positionQuestion > 0) {
    setFinalResults();
    router.push("/results");
    return null;
  }

  if (questions?.length > 0) {
    return (
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {questions[positionQuestion].category}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questions[positionQuestion].question),
            }}
          />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {positionQuestion} of {questions?.length}
        </Typography>
        <Button
          onClick={() => onQuestionAnswer(positionQuestion, true)}
          variant="outlined"
          color="success"
        >
          correct
        </Button>
        <Button
          onClick={() => onQuestionAnswer(positionQuestion, false)}
          variant="outlined"
          color="error"
        >
          incorrect
        </Button>
      </CardContent>
    );
  }
  return "error";
};

export default Quiz;
