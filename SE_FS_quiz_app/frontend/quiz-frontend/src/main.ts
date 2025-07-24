import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { QuizComponent } from './app/quiz/quiz.component';
import { ResultComponent } from './app/result/result.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'quiz', component: QuizComponent },
      { path: 'result', component: ResultComponent },
      { path: '', redirectTo: 'quiz', pathMatch: 'full' },
      { path: '**', redirectTo: 'quiz' }
    ])
  ]
});
