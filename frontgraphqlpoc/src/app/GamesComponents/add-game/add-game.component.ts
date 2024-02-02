import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css',
})
export class AddGameComponent {
  title = new FormControl('');
  platforms = new FormControl('');
  sent = true;

  constructor(private apollo: Apollo) {}

  sendData() {
    let platforms = this.platforms.value?.split(',') as [];

    if (this.title.value != '' && platforms.length > 0) {
      const ADDGAME = gql`
        mutation AddGame($game: AddGameInput!) {
          addGame(game: $game) {
            id
            title
            platform
          }
        }
      `;
      this.apollo
        .mutate({
          mutation: ADDGAME,
          variables: {
            game: {
              title: this.title.value,
              platform: platforms,
            },
          },
        })
        .subscribe
        /*({ data })console.log('got data', data);
          },
          (error) => {
            console.log('there was an error sending the query', error);
          }*/
        ();
      this.sent = false;
    }
  }
}
