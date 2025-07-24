import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  standalone: true,
  imports: [CommonModule] // ✅ Fix `*ngIf` and `*ngFor` errors
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.http.get<{ leaderboard: any[] }>('http://127.0.0.1:8000/leaderboard')
      .subscribe(response => {
        this.leaderboard = response.leaderboard;
        console.log("Leaderboard Data:", this.leaderboard);  // ✅ Debugging
      });
  }
}
