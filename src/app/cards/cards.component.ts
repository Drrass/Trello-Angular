import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class CardsComponent implements OnInit {
  @Input() listId!: string; // Receive list ID as input
  cards: any[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.listId) {
      this.getCards();
    }
  }

  getCards() {
    const { trelloApiKey, trelloAccessToken } = environment;
    const url = `https://api.trello.com/1/lists/${this.listId}/cards?key=${trelloApiKey}&token=${trelloAccessToken}`;

    this.http.get<any[]>(url).subscribe(
      (response: any[]) => {
        this.cards = response;
        console.log(`Cards for List ${this.listId}:`, this.cards);
      },
      (error: any) => {
        console.error('Error fetching cards:', error);
        this.error = 'Failed to load cards. Please try again.';
      }
    );
  }
}
