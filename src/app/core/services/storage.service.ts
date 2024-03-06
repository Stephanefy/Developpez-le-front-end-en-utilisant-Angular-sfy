import { Injectable } from '@angular/core';


/**
 * Service for local storage
 * to cache olympics data so that once first initialized on home page it won't need to be fetched again
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Set an item in local storage
  setItem<T>(key: string, value: T): void {
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
