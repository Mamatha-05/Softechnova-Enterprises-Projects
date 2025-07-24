import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface LeaderboardEntry {
  username: string;
  score: number;
}

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ResultComponent {
  playerName: string = 'Player';
  score: number = 0;
  appreciationMessage: string = '';
  leaderboard: LeaderboardEntry[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    console.log("ResultComponent received params:", params);
    this.playerName = params['username'] || "Player";
    this.score = Number(params['score']) || 0;
    this.setAppreciationMessage();
    this.updateLeaderboard();
  }

  setAppreciationMessage() {
    if (this.score === 5) {
      this.appreciationMessage = "✨ Perfect Score! You're a quiz master!";
    } else if (this.score >= 3) {
      this.appreciationMessage = "🔥 Great job! You're well on your way!";
    } else {
      this.appreciationMessage = "👏 Keep practicing, and you'll ace it next time!";
    }
  }

  updateLeaderboard() {
    const storedLeaderboard = localStorage.getItem('leaderboard');
    let leaderboardData: LeaderboardEntry[] = [];
    if (storedLeaderboard) {
      try {
        leaderboardData = JSON.parse(storedLeaderboard);
      } catch (e) {
        console.error("Error parsing leaderboard from localStorage", e);
      }
    }
    // Remove any existing entry for the current user (case-insensitive)
    leaderboardData = leaderboardData.filter(
      entry => entry.username.toLowerCase() !== this.playerName.toLowerCase()
    );
    // Add current user's new entry
    leaderboardData.push({ username: this.playerName, score: this.score });
    // Sort leaderboard in descending order by score
    leaderboardData.sort((a, b) => b.score - a.score);
    // Keep only the top 10 entries
    leaderboardData = leaderboardData.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    this.leaderboard = leaderboardData;
  }

  restartQuiz() {
    this.router.navigate(['/quiz']);
  }
}
