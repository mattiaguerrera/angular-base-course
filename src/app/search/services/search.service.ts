import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, delay } from 'rxjs/operators';

export interface SearchResult {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
}

// Dati di esempio per la ricerca
const MOCK_DATA: SearchResult[] = [
  { id: 1, name: 'Angular Component Library', description: 'Raccolta di componenti riutilizzabili per applicazioni Angular', category: 'Framework', rating: 4.8 },
  { id: 2, name: 'TypeScript Avanzato', description: 'Guida alle funzionalità avanzate di TypeScript per lo sviluppo', category: 'Linguaggio', rating: 4.5 },
  { id: 3, name: 'RxJS Observable Pattern', description: 'Implementazione del pattern Observable in applicazioni frontend', category: 'Libreria', rating: 4.7 },
  { id: 4, name: 'SQL Server Performance', description: 'Tecniche di ottimizzazione per database SQL Server', category: 'Database', rating: 4.3 },
  { id: 5, name: 'C# Design Patterns', description: 'Implementazione di pattern di progettazione in C#', category: 'Linguaggio', rating: 4.6 },
  { id: 6, name: 'REST API Best Practices', description: 'Linee guida per la progettazione di API RESTful', category: 'Backend', rating: 4.4 },
  { id: 7, name: 'Angular Routing Strategies', description: 'Strategie avanzate per il routing in Angular', category: 'Framework', rating: 4.2 },
  { id: 8, name: 'Dependency Injection', description: 'Tecniche di injection delle dipendenze in framework moderni', category: 'Pattern', rating: 4.1 },
  { id: 9, name: 'SOLID Principles', description: 'Applicazione dei principi SOLID nello sviluppo software', category: 'Teoria', rating: 4.9 },
  { id: 10, name: 'Entity Framework Core', description: 'Utilizzo di EF Core per accesso ai dati in .NET', category: 'ORM', rating: 4.0 },
  { id: 11, name: 'Reactive Programming', description: 'Paradigma di programmazione basato su flussi di dati e propagazione del cambiamento', category: 'Programmazione', rating: 4.7 },
  { id: 12, name: 'Microservizi con .NET', description: 'Architettura a microservizi con tecnologie .NET', category: 'Architettura', rating: 4.5 },
  { id: 13, name: 'SQL Server Query Optimization', description: 'Ottimizzazione delle query per migliorare performance', category: 'Database', rating: 4.2 },
  { id: 14, name: 'Angular State Management', description: 'Gestione dello stato in applicazioni Angular complesse', category: 'Frontend', rating: 4.6 },
  { id: 15, name: 'Unit Testing in C#', description: 'Strategie e strumenti per il testing in ambiente .NET', category: 'Testing', rating: 4.4 },
  { id: 16, name: 'TypeScript Generics', description: 'Utilizzo avanzato dei generics in TypeScript', category: 'Linguaggio', rating: 4.3 },
  { id: 17, name: 'CI/CD Pipeline', description: 'Implementazione di pipeline di integrazione e deployment continuo', category: 'DevOps', rating: 4.8 },
  { id: 18, name: 'ASP.NET Core Security', description: 'Tecniche di sicurezza per applicazioni ASP.NET Core', category: 'Sicurezza', rating: 4.7 },
  { id: 19, name: 'Angular Performance Tuning', description: 'Ottimizzazione delle performance in applicazioni Angular', category: 'Performance', rating: 4.5 },
  { id: 20, name: 'Docker per Sviluppatori', description: 'Utilizzo di Docker nell\'ambiente di sviluppo software', category: 'Container', rating: 4.6 }
];

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://api.example.com/items'; // URL di esempio (non utilizzato)

  constructor(private http: HttpClient) { }

  search(term: string): Observable<SearchResult[]> {
    if (!term.trim()) {
      // Se il termine di ricerca è vuoto, ritorna un array vuoto
      return of([]);
    }

    // Simula una chiamata API con i dati di esempio
    // In un'app reale, useresti qualcosa come:
    // return this.http.get<SearchResult[]>(`${this.apiUrl}?q=${term}`)
    return of(MOCK_DATA).pipe(
      // Simula un delay di rete
      delay(300), // Simula la latenza di rete
      // Filtra i risultati in base al termine di ricerca
      map(items => items.filter(item => 
        item.name.toLowerCase().includes(term.toLowerCase()) || 
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      )),
      catchError(error => {
        console.error('Error in search:', error);
        return of([]);
      })
    );
  }
}