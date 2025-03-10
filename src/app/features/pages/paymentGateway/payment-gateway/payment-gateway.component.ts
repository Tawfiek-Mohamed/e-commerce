import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

interface iOnlinePayment {
  status: string;
  session: Session;
}

interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

@Component({
  selector: 'app-payment-gateway',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss',
})
export class PaymentGatewayComponent {
  submitForm!: FormGroup;
  fb = inject(FormBuilder);
  ordersService = inject(OrdersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  currentCartId!: string;
  selectedMethod: string = '';

  ngOnInit(): void {
    this.getCurrentId();
    this.initForm();
  }

  getCurrentId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.currentCartId = parm.get('id')!;
      },
    });
  }

  initForm(): void {
    this.submitForm = this.fb.group({
      details: ['details', [Validators.required]],
      phone: ['01010800921', [Validators.required]],
      city: ['Cairo', [Validators.required]],
    });
  }

  onSubmitForm(selectedMethod: string) {
    console.log(this.submitForm.value);
    console.log(selectedMethod);

    if (selectedMethod === 'online') {
      this.onlinePayment();
    } else {
      this.cashPayment();
    }
  }

  onlinePayment() {
    this.ordersService
      .onlinePayment(this.currentCartId, this.submitForm.value)
      .subscribe({
        next: (res: iOnlinePayment) => {
          console.log(res.session.url);
          window.location.assign(res.session.url);
        },
      });
  }

  cashPayment() {
    this.ordersService
      .cashPayment(this.currentCartId, this.submitForm.value)
      .subscribe({
        next: (res: iOnlinePayment) => {
          this.router.navigate(['/allOrders']);
        },
      });
  }
}
