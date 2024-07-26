import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private router: Router) {}

  navigateToComponent1() {
    console.log('Navigating to Citas');
    this.router.navigate(['/citas']);
  }  

navigateToComponent2() {
  this.router.navigate(['/empleados']);
}

navigateToComponent3() {
  this.router.navigate(['/pacientes']);
}
  title = 'clinica';
}
