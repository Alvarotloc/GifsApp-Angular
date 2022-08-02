import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Gif, SearchGifResponse } from '../interfaces/gifs.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultado: Gif[] = [];

  public get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial') || '[]');
    this.resultado = JSON.parse(localStorage.getItem('resultado') || '[]');
  }

  public buscarGifs(query: string): void {
    query = query.trim().toLowerCase();
    if (query === '') return;
    else if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
    }
    localStorage.setItem('historial', JSON.stringify(this._historial));
    const params = new HttpParams()
      .set('q', query)
      .set('limit', '10')
      .set('api_key', environment.apiKey);

    this.http
      .get<SearchGifResponse>(
        `${this.servicioUrl}/search`,{params}
      )
      .subscribe((resp) => {
        localStorage.setItem('resultado', JSON.stringify(resp.data));
        return (this.resultado = resp.data);
      });
  }
}
