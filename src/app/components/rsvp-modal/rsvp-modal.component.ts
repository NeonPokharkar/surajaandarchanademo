import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeddingService, RsvpData } from '../../services/wedding.service';

@Component({
  selector: 'app-rsvp-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rsvp-modal.component.html',
  styleUrls: ['./rsvp-modal.component.css']
})
export class RsvpModalComponent {
  wedding = inject(WeddingService);

  formData: RsvpData = {
    guestName: this.wedding.guestName(),
    attending: 'yes',
    numberOfGuests: 2,
    message: ''
  };

  onSubmit(): void {
    if (this.formData.guestName.trim()) {
      this.wedding.submitRsvp(this.formData);
    }
  }

  close(): void {
    this.wedding.closeRsvpModal();
  }
}
