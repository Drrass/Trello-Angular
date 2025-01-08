import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class BoardsComponent implements OnInit {
  boards: any[] = [];
  error: string = '';

  constructor(){ }

  ngOnInit(): void {
    this.getBoards();
  }

  async getBoards(){
    const { trelloApiKey, trelloAccessToken, trelloApiUrl } = environment;
    const url = `${trelloApiUrl}?key=${trelloApiKey}&token=${trelloAccessToken}`;

    try{
      const response = await axios.get(url);
      this.boards = response.data;
      console.log(this.boards);
    } catch(error){
      console.error('Error fetching boards:', error);
      this.error = 'Failed to load boards. Please try again later.';
    }
  }
} 