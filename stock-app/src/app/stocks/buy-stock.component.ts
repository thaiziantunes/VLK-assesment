import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskService } from '../task.service';

export interface transactionData {
  stockName: string;
  qntStocks: number;
  totalPrice: number;
}

export interface UserData {
  id: string;
  userName: string;
  cashBalance: string;
}

export interface StockData {
  id: string;
  stockName: string;
  price: string;
}

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css'],
})
export class BuyStockComponent implements OnInit {
  totalStocks = '';
  myFinalValue = 0;
  isBought = false;

  users: UserData[] = [];
  stocks: StockData[] = [];

  user: UserData = { id: '', userName: '', cashBalance: '' };

  stock = new FormControl('');
  stockList: string[] = [''];

  constructor(public dialog: MatDialog, private taskService: TaskService) {}
  ngOnInit() {
    this.taskService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
    this.taskService.getStocks().subscribe((res: any) => {
      this.stocks = res;
    });
    setTimeout(() => {
      this.stocks.forEach((element) => {
        this.stockList.push(element.stockName);
      });
    }, 500);
  }

  searchUser(userIdInput: HTMLInputElement) {
    const id = userIdInput.value;
    this.taskService.getUserById(id).subscribe((res: any) => {
      this.user = res;
    });
  }

  getInputNum(
    userInput: HTMLInputElement,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    if (this.myFinalValue > +this.user.cashBalance) {
      alert(
        "it's not possible to buy the stocks because you balance is lower then the total amount"
      );
    } else if (this.myFinalValue < 0) {
      alert('sorry there is something wrong, please try againg');
    } else if (
      this.myFinalValue > 0 &&
      this.myFinalValue <= +this.user.cashBalance
    ) {
      const selStock = this.stocks.filter(
        (el) => el.stockName === this.stock.value
      )[0];
      const dialogRef = this.dialog.open(BuyStockDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          stockName: selStock.stockName,
          qntStocks: userInput.value,
          totalPrice: this.myFinalValue,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result > 0) {
          this.isBought = true;
        }
        let currentBalance = +(
          Math.round((+this.user.cashBalance - result) * 100) / 100
        ).toFixed(2);
        this.taskService
          .updateUser(this.user.id, currentBalance.toString())
          .subscribe(() => {});
      });
    }
  }

  valueUpdated(userInput: HTMLInputElement) {
    const selStock = this.stocks.filter(
      (el) => el.stockName === this.stock.value
    )[0];
    this.myFinalValue = +(
      Math.round(+userInput.value * +selStock.price * 100) / 100
    ).toFixed(2);
  }
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './buy-stock-dialog.html',
})
export class BuyStockDialog {
  constructor(
    public dialogRef: MatDialogRef<BuyStockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: transactionData
  ) {}
}
