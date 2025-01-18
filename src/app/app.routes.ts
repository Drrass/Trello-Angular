import { Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { ListsComponent } from './lists/lists.component';

export const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'lists', component: ListsComponent },
];                                                                    
