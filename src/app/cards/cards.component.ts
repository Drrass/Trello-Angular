import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
   @Input() listId!: String;
   cards: any[] = [];

  constructor(private http: HttpClient) {} ;
   ngOnInit(): void {
     this.getCards();
   }
   
   getCards(){
    const { trelloApiKey, trelloAccessToken } = environment;
    const url =`https://api.trello.com/1/lists/${this.listId}/cards?key=${trelloApiKey}&token=${trelloAccessToken}`
    this.http.get<any[]>(url).subscribe(
      (response)=>{
        this.cards = response;
        //     console.log("cards =>");
        //     console.log(this.cards);
      }
    )
   }
   
}
