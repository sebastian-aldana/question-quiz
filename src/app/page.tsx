"use client";

import { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Questions_data } from "../contexts/questions";
import "./globals.css";

const Home = () => {
  const router = useRouter();

  const onBeginClick = () => {
    router.push("/quiz");
  };

  const { setQuestions }: any = useContext(Questions_data);

  const questionsData = async () => {
    try {
      const { data } = await axios.get(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      );
      setQuestions(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    questionsData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="flex flex-col justify-center items-center ">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome to the Triviea Challengue
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            You will be pressented with 10 True of False questions
          </Typography>
          <Typography variant="body2">Can you score 100% ?</Typography>
          <Button onClick={onBeginClick} variant="contained">
            Begin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
