import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  onConfirm: () => void = () => {}; 
  onDecline: () => void = () => {}; 

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  confirm(): void {
    this.onConfirm();
    this.bsModalRef.hide();
  }

  decline(): void {
    this.onDecline();
    this.bsModalRef.hide();
  }
}
