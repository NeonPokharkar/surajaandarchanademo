import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { CoupleComponent } from './components/couple/couple.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SpecialComponent } from './components/special/special.component';
import { FooterComponent } from './components/footer/footer.component';
import { RsvpModalComponent } from './components/rsvp-modal/rsvp-modal.component';
import { FloatingActionsComponent } from './components/floating-actions/floating-actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    DeclarationComponent,
    CoupleComponent,
    ScheduleComponent,
    SpecialComponent,
    FooterComponent,
    RsvpModalComponent,
    FloatingActionsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Suraj & Archana | Wedding Invitation';
}

