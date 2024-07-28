import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Definición de la interfaz para los datos de la brigada
interface Brigate {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-brigate-index',
  templateUrl: './brigate-index.component.html',
  styleUrl: './brigate-index.component.sass',
})
export class BrigateIndexComponent implements OnInit {

  // Propiedad de entrada para recibir los datos de la brigada
  @Input() brigate: Brigate | null = null;

  // Evento de salida que notifica al componente padre
  @Output() update = new EventEmitter<Brigate>();

  // Método para manejar la actualización de la brigada
  onUpdate(): void {
    if (this.brigate) {
      this.update.emit(this.brigate);
    }
  }

  constructor() { }

  ngOnInit(): void {
    // Inicialización del componente
  }
}