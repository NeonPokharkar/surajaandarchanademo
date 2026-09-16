import { Injectable, signal } from '@angular/core';

export interface RsvpData {
  guestName: string;
  attending: 'yes' | 'no';
  numberOfGuests: number;
  message?: string;
  submittedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingService {
  readonly weddingDate = new Date('2027-02-15T10:42:00+05:30');
  readonly venueMapUrl = 'https://maps.google.com/?q=Baner+Road+Pune';

  // State signals
  guestName = signal<string>('Mr. & Mrs. Sharma');
  isRsvpModalOpen = signal<boolean>(false);
  rsvpSubmitted = signal<boolean>(false);
  isPlayingMusic = signal<boolean>(false);

  // Countdown signals
  days = signal<number>(0);
  hours = signal<number>(0);
  minutes = signal<number>(0);
  seconds = signal<number>(0);

  private audioCtx: AudioContext | null = null;
  private audioGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private countdownTimer: any = null;

  constructor() {
    this.initGuestFromUrl();
    this.startCountdown();
    this.checkSavedRsvp();
  }

  private initGuestFromUrl(): void {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest') || params.get('to');
      if (guest && guest.trim().length > 0) {
        this.guestName.set(guest.trim());
      }
    }
  }

  private checkSavedRsvp(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_rsvp_status');
      if (saved === 'submitted') {
        this.rsvpSubmitted.set(true);
      }
    }
  }

  startCountdown(): void {
    const update = () => {
      const now = new Date().getTime();
      const diff = this.weddingDate.getTime() - now;
      if (diff > 0) {
        this.days.set(Math.floor(diff / (1000 * 60 * 60 * 24)));
        this.hours.set(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes.set(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds.set(Math.floor((diff % (1000 * 60)) / 1000));
      } else {
        this.days.set(0);
        this.hours.set(0);
        this.minutes.set(0);
        this.seconds.set(0);
      }
    };

    update();
    this.countdownTimer = setInterval(update, 1000);
  }

  setGuestName(name: string): void {
    if (name.trim()) {
      this.guestName.set(name.trim());
    }
  }

  openRsvpModal(): void {
    this.isRsvpModalOpen.set(true);
  }

  closeRsvpModal(): void {
    this.isRsvpModalOpen.set(false);
  }

  submitRsvp(data: RsvpData): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_rsvp_status', 'submitted');
      localStorage.setItem('wedding_rsvp_data', JSON.stringify({ ...data, submittedAt: new Date().toISOString() }));
    }
    this.rsvpSubmitted.set(true);
  }

  getGoogleCalendarUrl(): string {
    const title = encodeURIComponent('Suraj & Archana Wedding Ceremony & Reception');
    const details = encodeURIComponent('Celebrating the wedding of Suraj & Archana. Venue: Shree Ganesh Lawns, Baner Road, Pune.');
    const location = encodeURIComponent('Shree Ganesh Lawns, Baner Road, Pune');
    const start = '20270215T051200Z'; // 10:42 AM IST in UTC
    const end = '20270215T163000Z'; // 10:00 PM IST in UTC
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  }

  toggleMusic(): void {
    if (this.isPlayingMusic()) {
      this.stopAmbientMusic();
      this.isPlayingMusic.set(false);
    } else {
      this.playAmbientMusic();
      this.isPlayingMusic.set(true);
    }
  }

  private playAmbientMusic(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx || this.audioCtx.state === 'closed') {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.audioGain = this.audioCtx.createGain();
      this.audioGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      this.audioGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 2);
      this.audioGain.connect(this.audioCtx.destination);

      // Traditional Indian Tanpura / meditative chord frequencies (C# base: Sa-Pa-Sa')
      const freqs = [138.59, 207.65, 277.18, 415.30];
      this.oscillators = freqs.map((freq) => {
        const osc = this.audioCtx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

        const lfo = this.audioCtx!.createOscillator();
        const lfoGain = this.audioCtx!.createGain();
        lfo.frequency.value = 0.2 + Math.random() * 0.2;
        lfoGain.gain.value = 1.2;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(this.audioGain!);
        osc.start();
        return osc;
      });
    } catch {
      // Audio context might be restricted
    }
  }

  private stopAmbientMusic(): void {
    if (this.audioGain && this.audioCtx) {
      try {
        this.audioGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.oscillators = [];
        }, 1000);
      } catch {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
      }
    }
  }
}
