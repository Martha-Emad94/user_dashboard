import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, any>();
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    this.isLoading.next(true);
    return this.http.get(`${this.baseUrl}?page=${page}`).pipe(
      tap(() => this.isLoading.next(true)), // Not necessary to call here
      finalize(() => this.isLoading.next(false))
    );
  }

  getUserById(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    } else {
      this.isLoading.next(true);
      return this.http.get(`${this.baseUrl}/${id}`).pipe(
        tap(data => {
          this.userCache.set(id, data);
        }),
        finalize(() => this.isLoading.next(false))
      );
    }
  }
}
