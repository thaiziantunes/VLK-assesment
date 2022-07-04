import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}

  getUsers() {
    return this.webReqService.get('users');
  }

  getUserById(id: string) {
    return this.webReqService.getById('user', id);
  }

  getStocks() {
    return this.webReqService.get('stocks');
  }

  getStocksByName(id: string) {
    return this.webReqService.getById('stock', id);
  }

  updateUser(id: string, cashBalance: string) {
    return this.webReqService.patch(`user/${id}`, { cashBalance });
  }
}
