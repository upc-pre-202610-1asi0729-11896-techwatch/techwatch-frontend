import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {MangamentStore} from '../../../../aplication/mangament-store';
import {HomeEntity} from '../../../../domain/models/home/home-entity';

@Component({
  selector: 'app-home-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './home-form.html',
  styleUrl: './home-form.css',
})
export class HomeForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(MangamentStore);

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    userId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
  });

  isEdit = false;

  homeId: number | null = null;
  userId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.homeId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.homeId;
      if (this.isEdit && this.homeId) {
        let id = this.homeId;
        const home = this.store.getHomeById(id)();
        if (home) {
          this.form.patchValue({ name: home.name });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const home: HomeEntity = new HomeEntity({
      id: this.homeId ?? 0,
      name: this.form.value.name!,
      type: this.form.value.type!,
      userId: this.userId ?? 0,
    });

    if (this.isEdit) {
      this.store.updateHome(home);
    } else {
      this.store.addHome(home);
    }

    this.router.navigate(['managament/home']).then();
  }
}
