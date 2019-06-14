import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  templateUrl: './title-form.component.html'
})
export class TitleFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  save(): void {
    this.ref.close(this.form.get('title').value);
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [null, Validators.required]
    });
  }

}
