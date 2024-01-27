"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";

import { Questions_data } from "@/contexts/questions";

const Results = () => {
  const router = useRouter();
  const { questions, results }: any = useContext(Questions_data);

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="flex flex-col justify-center items-center ">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            You Scored
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {results.correctAnswers}/{questions.length}
          </Typography>

          {questions.map((question: any, index: number) => {
            return (
              <div className="flex  self-start" key={index}>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                  className="ml-5"
                >
                  {results.answers[index] ? "✅" : "❌"}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(question.question),
                    }}
                  />
                </Typography>
              </div>
            );
          })}
          <Button onClick={goToHome} variant="outlined">
            play again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
