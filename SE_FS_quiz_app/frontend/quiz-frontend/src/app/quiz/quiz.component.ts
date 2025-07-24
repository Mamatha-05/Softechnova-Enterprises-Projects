import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class QuizComponent {
  quizQuestions: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion: any;
  timer: number = 10;
  interval: any;
  selectedAnswer: string | null = null;
  isCorrect: boolean = false;
  score: number = 0;
  quizStarted: boolean = false;
  quizFinished: boolean = false;
  playerName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  startQuiz() {
    if (this.playerName.trim() === '') {
      alert('Please enter your name before starting!');
      return;
    }
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.getQuizQuestions();
  }

  getQuizQuestions() {
    this.http.get<any[]>('http://127.0.0.1:8000/quiz').subscribe(response => {
      // Assuming the response is an array – we take the first 5 questions.
      this.quizQuestions = response.slice(0, 5);
      this.loadQuestion();
    }, error => {
      console.error("Error fetching quiz data:", error);
    });
  }

  loadQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length) {
      this.currentQuestion = this.quizQuestions[this.currentQuestionIndex];
      this.selectedAnswer = null;
      this.startTimer();
    } else {
      this.showFinalScore();
    }
  }

  startTimer() {
    this.timer = 10;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.nextQuestion();
      }
    }, 1000);
  }

  checkAnswer(option: string) {
    // Prevent multiple clicks.
    if (this.selectedAnswer) return;
    
    this.selectedAnswer = option;
    clearInterval(this.interval);
    
    this.isCorrect = option === this.currentQuestion.correct;
    if (this.isCorrect) {
      this.score++;
    }
    
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.loadQuestion();
  }

  showFinalScore() {
    this.quizFinished = true;
    this.router.navigate(['/result'], { queryParams: { score: this.score, username: this.playerName } });
  }
}
