import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  history: string[] = [];

  add(message: string): void {
    this.history.push(message);
  }

  clear(): void {
    this.history = [];
  }

  constructor() { }
}
