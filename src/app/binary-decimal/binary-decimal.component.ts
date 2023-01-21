import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-binary-decimal',
  templateUrl: './binary-decimal.component.html',
  styleUrls: ['./binary-decimal.component.scss']
})
export class BinaryDecimalComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  binaryField: FormControl = new FormControl(null, [Validators.pattern('[0-1]*')]);
  decimalField: FormControl = new FormControl(null, [Validators.pattern('[0-9]*')]);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  //getters and setters
  get binaryValue() {
    return this.binaryField.value;
  }

  set binaryValue(value: string) {
    this.binaryField.setValue(value);
  }

  get decimalValue() {
    return this.decimalField.value;
  }

  set decimalValue(value: number) {
    this.decimalField.setValue(value);
  }

  //functions
  convertBinaryToDecimal() {
    if(this.binaryValue == '')
      this.decimalField.setValue('');
    else if (this.binaryField.valid) {
      this.decimalValue = 0;
      let exponent = 0;
      for (let i = this.binaryValue.length - 1; i >= 0; i--) {
        if (this.binaryValue.charAt(i) == '1') {
          this.decimalValue += Math.pow(2, exponent);
        }
        exponent++;
      }
    }
  }

  convertDecimalToBinary() {
    let nValue = this.decimalValue;
    let char = '';
    while (nValue > 1) {
      char = (nValue % 2).toString() + char;
      nValue = Math.trunc(nValue / 2);
      if (nValue == 1) char = nValue + char;
    }
    this.binaryValue = char;
  }
}
