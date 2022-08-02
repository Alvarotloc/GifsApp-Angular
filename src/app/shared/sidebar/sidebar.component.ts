import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService){}
  get historial(): string[] {
    return this.gifsService.historial;
  } 
  public buscarDesdeSidebar(evento: Event,query: string):void {
    evento.preventDefault();
    this.gifsService.buscarGifs(query);
  }
}
