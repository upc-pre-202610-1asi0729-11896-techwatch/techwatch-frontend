import {Component, inject} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {ManagementStore} from '../../../../application/mangament-store';
import {HomeEntity} from '../../../../domain/models/home/home-entity';

@Component({
  selector: 'app-home-form',
  imports: [TitleCasePipe, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './home-form.html',
  styleUrl: './home-form.css',
})
export class HomeForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ManagementStore);

  readonly homeTypes = ['apartment', 'house'];

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  isEdit = false;
  homeId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.homeId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.homeId;
      if (this.isEdit && this.homeId) {
        const home = this.store.getHomeById(this.homeId)();
        if (home) {
          this.form.patchValue({ name: home.name, type: home.type });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const home = new HomeEntity({
      id: this.homeId ?? 0,
      name: this.form.value.name!,
      type: this.form.value.type!,
      userId: 1,
    });

    if (this.isEdit) {
      this.store.updateHome(home);
    } else {
      this.store.addHome(home);
    }

    this.router.navigate(['/management/homes']);
  }

  cancel() {
    this.router.navigate(['/management/homes']);
  }
}
