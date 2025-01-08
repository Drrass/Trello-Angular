import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BoardsComponent } from './boards/boards.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, BoardsComponent, RouterOutlet],
  standalone: true
})
export class AppComponent implements OnInit{
  title = 'trello';

  ngOnInit() {
  }
}