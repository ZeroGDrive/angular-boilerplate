import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthStore} from '../../auth/auth.store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private  fb: FormBuilder,
              private authStore: AuthStore,
              private router: Router,
              private route: ActivatedRoute) {
    this.authStore.loggedIn$.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/main');
      }
    });

  }

  loginForm = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authStore.login(this.loginForm.value).subscribe(res => {
      if (res) {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
        this.router.navigate([returnUrl]);
      }
    });
  }

}
