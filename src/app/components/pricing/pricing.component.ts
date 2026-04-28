import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
}

interface PriceCalculation {
  name: string;
  total: string;
  breakdown: string;
  effectivePrice: string;
  isCheapest: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  roomCount: number = 0;
  calculations: PriceCalculation[] = [];

  plans: PricingPlan[] = [
    { name: 'Small', price: '19,99', description: '0,10 €' },
    { name: 'Medium', price: '49,99', description: '0,05 €' },
    { name: 'Large', price: '89,99', description: '0,025 €' }
  ];

  setupFee: string = '799,00';

  features: string[] = [
    'Raumbücher & Kalkulation',
    'Stammdatenverwaltung',
    'Automatische Synchronisation',
    'Import & Export',
    'Eigene Domain',
    'Rechteverwaltung',
    'Unbegrenzte Benutzer',
    'Unbegrenzte Mandanten',
    'Premium Support inklusive'
  ];

  ngOnInit() {
    this.calculatePrices();
  }

  getBasePrice(planName: string): string {
    const plan = this.plans.find(p => p.name === planName);
    return plan ? plan.price : '0,00';
  }

  getPricePerRoom(planName: string): string {
    const plan = this.plans.find(p => p.name === planName);
    return plan ? plan.description : '0,00 €';
  }

  calculatePrices() {
    const rooms = this.roomCount || 0;
    
    // Parse prices from current model
    const smallBase = parseFloat(this.plans[0].price.replace(',', '.'));
    const smallPerRoom = parseFloat(this.plans[0].description.replace(',', '.').replace(' €', ''));
    const mediumBase = parseFloat(this.plans[1].price.replace(',', '.'));
    const mediumPerRoom = parseFloat(this.plans[1].description.replace(',', '.').replace(' €', ''));
    const largeBase = parseFloat(this.plans[2].price.replace(',', '.'));
    const largePerRoom = parseFloat(this.plans[2].description.replace(',', '.').replace(' €', ''));
    
    const smallTotal = smallBase + (rooms * smallPerRoom);
    const mediumTotal = mediumBase + (rooms * mediumPerRoom);
    const largeTotal = largeBase + (rooms * largePerRoom);

    const minPrice = Math.min(smallTotal, mediumTotal, largeTotal);

    this.calculations = [
      {
        name: 'Small',
        total: smallTotal.toFixed(2),
        breakdown: `${this.plans[0].price} € + (${rooms} × ${this.plans[0].description})`,
        effectivePrice: rooms > 0 ? (smallTotal / rooms).toFixed(3) : '0.000',
        isCheapest: smallTotal === minPrice
      },
      {
        name: 'Medium',
        total: mediumTotal.toFixed(2),
        breakdown: `${this.plans[1].price} € + (${rooms} × ${this.plans[1].description})`,
        effectivePrice: rooms > 0 ? (mediumTotal / rooms).toFixed(3) : '0.000',
        isCheapest: mediumTotal === minPrice
      },
      {
        name: 'Large',
        total: largeTotal.toFixed(2),
        breakdown: `${this.plans[2].price} € + (${rooms} × ${this.plans[2].description})`,
        effectivePrice: rooms > 0 ? (largeTotal / rooms).toFixed(3) : '0.000',
        isCheapest: largeTotal === minPrice
      }
    ];
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
