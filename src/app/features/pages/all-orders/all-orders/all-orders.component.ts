import { Component, inject } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { iALLOrders } from '../../../../shared/interface/orders/iAllOrders';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  allOrders!: iALLOrders[];

  ordersService = inject(OrdersService);
  auth = inject(AuthService);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {}
}
