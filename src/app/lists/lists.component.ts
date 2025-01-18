import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../cards/cards.component';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardsComponent, FormsModule],
})
export class ListsComponent implements OnInit {
  boardId: string | null = '';
  lists: any[] = [];
  error: string = '';
  newListName: string = '';

  constructor(
    private location: Location,
    private http: HttpClient,
  ) {}

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
        this.lists = response;
        console.log(this.lists);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async addLists() {
    if (!this.newListName.trim()) {
      this.error = 'List name cannot be empty.';
      console.log('List name cannot be empty.');
      return;
    }
    const { trelloApiKey, trelloAccessToken } = environment;
    const url = `https://api.trello.com/1/boards/${this.boardId}/lists?name=${encodeURIComponent(this.newListName)}&key=${trelloApiKey}&token=${trelloAccessToken}`;
  
    try {
      const response = await axios.post(url);
      this.lists.push(response.data);
      console.log('Lists added:', response.data);
      this.getLists();
      
    } catch (error) {
      console.log(error);
    }
  }
}
