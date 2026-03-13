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
  
  // PREISMODELL VARIANTEN - Aktiviere eine der drei Varianten
  currentModel: 'optimiert' | 'premium' | 'growth' | 'weitgestreut' | 'original' = 'original';

  // VARIANTE 0: "ORIGINAL" - Deine ursprünglichen Preise
  plansOriginal: PricingPlan[] = [
    { name: 'Small', price: '19,99', description: '0,10 €' },
    { name: 'Medium', price: '49,99', description: '0,05 €' },
    { name: 'Large', price: '89,99', description: '0,025 €' }
  ];

  // VARIANTE 1: "OPTIMIERT" - Bessere Margen, klare Sprünge
  plansOptimiert: PricingPlan[] = [
    { name: 'Small', price: '29,99', description: '0,12 €' },
    { name: 'Medium', price: '69,99', description: '0,06 €' },
    { name: 'Large', price: '129,99', description: '0,035 €' }
  ];

  // VARIANTE 2: "PREMIUM" - Höhere Grundgebühren, attraktive Raumpreise
  plansPremium: PricingPlan[] = [
    { name: 'Small', price: '49,99', description: '0,09 €' },
    { name: 'Medium', price: '99,99', description: '0,04 €' },
    { name: 'Large', price: '179,99', description: '0,02 €' }
  ];

  // VARIANTE 3: "GROWTH" - Moderate Preise, schnelles Wachstum
  plansGrowth: PricingPlan[] = [
    { name: 'Small', price: '39,99', description: '0,10 €' },
    { name: 'Medium', price: '79,99', description: '0,05 €' },
    { name: 'Large', price: '149,99', description: '0,03 €' }
  ];

  // VARIANTE 4: "WEIT GESTREUT" - Break-even bei 5.000 und 15.000 Räumen
  plansWeitGestreut: PricingPlan[] = [
    { name: 'Small', price: '29,99', description: '0,10 €' },
    { name: 'Medium', price: '229,99', description: '0,06 €' },
    { name: 'Large', price: '529,99', description: '0,04 €' }
  ];

  plans: PricingPlan[] = this.plansOriginal;

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
    // Wähle Preismodell
    this.selectPricingModel(this.currentModel);
    this.calculatePrices();
  }

  selectPricingModel(model: 'optimiert' | 'premium' | 'growth' | 'weitgestreut' | 'original') {
    this.currentModel = model;
    switch (model) {
      case 'original':
        this.plans = this.plansOriginal;
        break;
      case 'optimiert':
        this.plans = this.plansOptimiert;
        break;
      case 'premium':
        this.plans = this.plansPremium;
        break;
      case 'growth':
        this.plans = this.plansGrowth;
        break;
      case 'weitgestreut':
        this.plans = this.plansWeitGestreut;
        break;
    }
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
