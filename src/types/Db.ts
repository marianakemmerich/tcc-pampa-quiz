import db from '../data/db.json'

interface Option {
    answer: string;
    isCorrect: boolean;
  }
  
  interface QuestionType {
    id: number;
    level: "fácil" | "mediano" | "difícil";
    category: "fauna" | "flora" | "geral";
    question: string;
    options: Option[];
  }
  
  interface Db {
    fauna: QuestionType[];
    flora: QuestionType[];
    geral: QuestionType[];
  }