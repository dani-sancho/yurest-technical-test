import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PagedResponse<T> {
  data: T[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly delayMs = 700;

  get<T>(
    endpoint: string,
    params?: HttpParams | Record<string, string | number | boolean>,
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, {
        params: this.buildParams(params),
      })
      .pipe(delay(this.delayMs));
  }

  getPaged<T>(
    endpoint: string,
    params?: HttpParams | Record<string, string | number | boolean>,
  ): Observable<PagedResponse<T>> {
    return this.http
      .get<T[]>(`${this.baseUrl}${endpoint}`, {
        params: this.buildParams(params),
        observe: 'response',
      })
      .pipe(
        delay(this.delayMs),
        map((res: HttpResponse<T[]>) => ({
          data: res.body ?? [],
          total: Number(res.headers.get('X-Total-Count') ?? 0),
        })),
      );
  }

  post<T>(endpoint: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, body, {
        headers,
      })
      .pipe(delay(this.delayMs));
  }

  put<T>(endpoint: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, body, {
        headers,
      })
      .pipe(delay(this.delayMs));
  }

  patch<T>(endpoint: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}${endpoint}`, body, {
        headers,
      })
      .pipe(delay(this.delayMs));
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`, {
        headers,
      })
      .pipe(delay(this.delayMs));
  }

  private buildParams(
    params?: HttpParams | Record<string, string | number | boolean>,
  ): HttpParams | undefined {
    if (!params) return undefined;

    if (params instanceof HttpParams) {
      return params;
    }

    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value.toString());
    });

    return httpParams;
  }
}
