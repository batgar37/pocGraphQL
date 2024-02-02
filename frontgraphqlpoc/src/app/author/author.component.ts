import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Review} from "../review/review";
import {Auhtor} from "./model/Author";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-author',
  standalone: true,
    imports: [
        NgForOf,
        FormsModule
    ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit{
    authors!: Auhtor[];
    error: any;
    newAuthor: any = {};
    selectedAuthor: any;
    constructor(private apollo: Apollo) {}
    ngOnInit(): void {
      this.listAuthor();
    }
    onSubmit() {
        if (this.selectedAuthor) {
            // Mettre à jour l'auteur existant
            const edits = {
                name: this.newAuthor.name,
                verified: this.newAuthor.verified,
                // Ajoutez d'autres propriétés à mettre à jour si nécessaire
            };

            this.onUpdateAuhtor(this.selectedAuthor.id, edits);
        } else {
            // Ajouter un nouvel auteur
            this.addAuthor(this.newAuthor);
        }

        // Réinitialisez le formulaire après l'ajout ou la mise à jour
        this.selectedAuthor = null;
        this.newAuthor = { id: null, name: '', verified: false, reviews: [] };
    }

    listAuthor(){
    this.apollo
        .watchQuery({
            query: gql`
          {
            authors {
              id
              name
              verified
              reviews {
                content
              }

            }
          }
        `,
        })
        .valueChanges.subscribe((result: any) => {
        this.authors = result.data?.authors;
console.log("liste",this.authors)
    });
}
    // Assuming you have a mutation to add a new author

    onDeleteAuthor(authorId: number) {
        this.apollo
            .mutate({
                mutation: gql`
        mutation DeleteMutation($id: ID!) {
          deleteAuthor(id: $id) {
            id
          }
        }
      `,
                variables: { id: authorId },
            })
            .subscribe((result: any) => {
                // Assuming the server responds with the ID of the deleted author
                const deletedAuthorId = result.data?.deleteAuthor?.id;

                // Update the list of authors by filtering out the deleted author
                this.authors = this.authors.filter(author => author.id !== deletedAuthorId);
                console.log('Author deleted', deletedAuthorId);
            });
        this.listAuthor()
    }


    onUpdateAuhtor(authorId: number, edits: any) {
        this.apollo
            .mutate({
                mutation: gql`
                mutation editMutation($edits: EditsAuthorInput!, $updateAuthorId: ID!) {
                    updateAuthor(edits: $edits, id: $updateAuthorId) {
                        name
                        verified
                        reviews {
                            content
                            rating
                        }
                    }
                }
            `,
                variables: { edits, updateAuthorId: authorId },
            })
            .subscribe((result: any) => {
                // Assuming the server responds with the updated author
                const updatedAuthorData = result.data?.updateAuthor;

                // Update the list of authors by replacing the old author with the updated one
                this.authors = this.authors.map(author =>
                    author.id === updatedAuthorData.id ? updatedAuthorData : author
                );

                console.log('Author updated', updatedAuthorData);
            });
    }
    onUpdateAuthor(author: Auhtor) {
        // Assurez-vous de créer une copie de l'auteur pour éviter les références partagées
        this.selectedAuthor = { ...author };

        // Vous pouvez également pré-remplir les champs du formulaire avec les détails de l'auteur sélectionné si nécessaire
        this.newAuthor = { ...this.selectedAuthor };
    }
    addAuthor(newAuthor: any) {
        // Assuming you have a mutation to add a new author
        this.apollo
            .mutate({
                mutation: gql`
                mutation AddMutation($author: AddInputAuthor!) {
                    addAuthor(author: $author) {
                        id
                        name
                        verified
                    }
                }
            `,
                variables: { author: newAuthor }, // Use the correct variable name here
            })
            .subscribe((result: any) => {
                // Assuming the server responds with the newly added author
                const addedAuthor = result.data?.addAuthor;

                // Update the list of authors
                this.authors = [...this.authors, addedAuthor];
                console.log('Author added', addedAuthor);
            });
    }

}
