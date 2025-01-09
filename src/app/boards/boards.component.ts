import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class BoardsComponent implements OnInit {
  boards: any[] = [];
  error: string = '';
  newBoardName: string = ''; 

  constructor() {}

  ngOnInit(): void {
    this.getBoards();
  }

  async getBoards() {
    const { trelloApiKey, trelloAccessToken, trelloApiUrl } = environment;
    const url = `${trelloApiUrl}?key=${trelloApiKey}&token=${trelloAccessToken}`;

    try {
      const response = await axios.get<any[]>(url);
      this.boards = response.data;
      console.log(this.boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
      this.error = 'Failed to load boards. Please try again later.';
    }
  }

  async addBoard() {
    if (!this.newBoardName.trim()) {
      this.error = 'Board name cannot be empty.';
      return;
    }
  
    const { trelloApiKey, trelloAccessToken } = environment;
    const url = `https://api.trello.com/1/boards?name=${this.newBoardName}&key=${trelloApiKey}&token=${trelloAccessToken}`;
  
    try {
      console.log(this.newBoardName);
      
      const response = await axios.post(url)
      this.boards.push(response.data); 
      console.log('Board added:', response.data);
      this.newBoardName = ''; 
      this.error = ''; 
    } catch (error) {
      console.error('Error adding board:', error);
      this.error = 'Failed to add board. Please try again.';
    }
  }
  handleBoardclick(boardId:string): void{
    console.log('Board ID:', boardId);
  }
}

