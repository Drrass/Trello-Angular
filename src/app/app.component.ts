import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import axios from 'axios';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    this.getBoards();
  }
  title = 'trello';

 async getBoards(){
  const { trelloApiKey, trelloAccessToken } = environment;
  const url = `https://api.trello.com/1/members/me/boards?key=${trelloApiKey}&token=${trelloAccessToken}`;

    try{
      const response = await axios.get(url);
      console.log(response.data);
      
    }catch(error){
      console.error('Error fetching boards:', error);
    }
 }
}