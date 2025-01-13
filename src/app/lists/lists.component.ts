import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  standalone: true,
  imports: [HttpClientModule],
})
export class ListsComponent implements OnInit {
  boardId: string | null = '';

  constructor(private location: Location, private http: HttpClient) {}

  ngOnInit(): void {
    const navigation = this.location.getState() as { boardId: string };
    if (navigation && navigation.boardId) {
      this.boardId = navigation.boardId;
      this.getLists();
    }
  }

  getLists() {
    const { trelloApiKey, trelloAccessToken } = environment;
    const url = `https://api.trello.com/1/boards/${this.boardId}/lists?key=${trelloApiKey}&token=${trelloAccessToken}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        console.log('Lists:', response);
      },
      (error) => {
        console.error('Error fetching lists:', error);
      }
    );
  }
}
