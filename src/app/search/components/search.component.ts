import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SearchResult, SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  results$!: Observable<SearchResult[]>;
  isLoading = false;
  
  // Soggetto per gestire l'unsubscribe quando il componente viene distrutto
  private destroy$ = new Subject<void>();
  
  // Un esempio di come gestire subscription manualmente
  private manualSubscription!: Subscription;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // Configura l'observable per la ricerca
    this.results$ = this.searchControl.valueChanges.pipe(
      // Aspetta 300ms dopo l'ultima digitazione
      debounceTime(300),
      
      // Ignora se il termine di ricerca non è cambiato
      distinctUntilChanged(),
      
      // Mostra l'indicatore di caricamento
      tap(() => this.isLoading = true),
      
      // Annulla la richiesta precedente quando ne arriva una nuova
      switchMap(term => this.searchService.search(term || '')),
      
      // Nascondi l'indicatore di caricamento quando i risultati arrivano
      tap(() => this.isLoading = false),
      
      // Annulla la sottoscrizione quando il componente viene distrutto
      takeUntil(this.destroy$)
    );

    // Esempio di una sottoscrizione manuale 
    // (in alternativa all'approccio async pipe nel template)
    this.manualSubscription = this.results$.subscribe(
      results => {
        console.log('Got search results:', results);
        // In un'app reale, potresti fare qualcosa con i risultati qui
      },
      error => {
        console.error('Search error:', error);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    // Emetti un valore per completare tutti gli observable che usano takeUntil
    this.destroy$.next();
    this.destroy$.complete();
    
    // Annulla esplicitamente la sottoscrizione manuale
    if (this.manualSubscription) {
      this.manualSubscription.unsubscribe();
    }
  }
}