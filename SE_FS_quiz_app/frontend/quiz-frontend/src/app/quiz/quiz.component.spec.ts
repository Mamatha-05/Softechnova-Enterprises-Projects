import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule]
})
export class QuizComponent implements OnInit {
  quizQuestions: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion: any;
  timer: number = 10;
  interval: any;
  selectedAnswer: string = '';
  isCorrect: boolean = false;
  feedback: string = '';
  score: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getQuizQuestions();
  }

  getQuizQuestions() {
  this.http.get('http://localhost:8000/quiz').subscribe(
    response => {
      console.log("API Response:", response);  // 🔍 Debugging: Log response data
      this.quizQuestions = response as any[];
      
      if (this.quizQuestions.length > 0) {
        this.loadQuestion();
      } else {
        console.error("No questions received from the API.");
      }
    },
    error => {
      console.error("Error fetching quiz data:", error);
    }
  );
}


  loadQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length) {
      this.currentQuestion = this.quizQuestions[this.currentQuestionIndex];
      this.startTimer();
    } else {
      this.router.navigate(['/result']);
    }
  }

  startTimer() {
    this.timer = 10;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.feedback = `⏳ Time is up! The correct answer was: ${this.currentQuestion.correct}`;
        this.nextQuestion();
      }
    }, 1000);
  }

  checkAnswer(option: string) {
    this.selectedAnswer = option;
    clearInterval(this.interval);  // Stop timer when answered

    if (option === this.currentQuestion.correct) {
      this.isCorrect = true;
      this.feedback = '🎉 Great job! Keep going!';
      this.score++;
    } else {
      this.isCorrect = false;
      this.feedback = `😢 Oops! The correct answer was: ${this.currentQuestion.correct}`;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswer = '';
    this.isCorrect = false;
    this.feedback = '';
    this.loadQuestion();
  }
}
