import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = 'Primeira';
  itemsPerPageLabel = 'Itens por página';
  lastPageLabel = 'Última';
  nextPageLabel = 'Próxima';
  previousPageLabel = 'Anterior';

  constructor() {}

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Página 1 de 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
