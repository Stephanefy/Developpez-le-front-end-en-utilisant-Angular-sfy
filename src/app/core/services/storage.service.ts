import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Set an item in local storage
  setItem(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (err) {
      console.error('Error saving to localStorage', err);
    }
  }

  // Get an item from local storage
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error getting data from localStorage', err);
      return null;
    }
  }

  // Remove an item from local storage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error removing item from localStorage', err);
    }
  }

  // Clear all local storage
  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage', err);
    }
  }
}
