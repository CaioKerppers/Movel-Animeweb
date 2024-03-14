import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Anime } from 'src/app/model/entities/Anime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  animes: Anime[] = [];
  query: string;
  isLoading: boolean = false;
  model: any = {
    icon: 'search-outline',
    title: 'Nenhum anime encontrado.'
  };

  constructor(private firebaseService: FirebaseService,private router : Router) {
    setTimeout(() => { this.sInput.setFocus(); }, 500);
  }

  ngOnInit() {
  }

  paraHome() {
    this.router.navigate(['/home']);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.animes = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      this.firebaseService.search(this.query).subscribe((results: Anime[]) => {
        this.animes = results;
        console.log(this.animes);
        this.isLoading = false;
        this.query = null;
      });
    }
  }
}
