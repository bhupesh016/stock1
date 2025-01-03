import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarVisible = false;
  isResponsive = false;
  buttonPosition = { top: 15, left: 15 };
  portfolioData: any[] = []; // Array to store API data
  errorMessage: string | null = null;

  constructor(private portfolioService: AuthService) { }
  ngOnInit(): void {
    this.isResponsive = window.innerWidth <= 768;
    this.fetchPortfolioData();

  }
  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isResponsive = event.target.innerWidth <= 768;
    if (this.isResponsive && this.sidebarVisible) {
      this.sidebarVisible = false;
    }
  }
  fetchPortfolioData() {
    this.portfolioService.getUserPortfolio().subscribe({
      next: (response) => {
        if (response.status === 'Success' && response.data) {
          this.portfolioData = response.data;
        } else {
          this.errorMessage = 'Unexpected response format.';
        }
      },
      error: (err) => {
        console.error('Error fetching portfolio:', err);
        this.errorMessage = 'Failed to load portfolio data.';
      },
    });
  }
}
