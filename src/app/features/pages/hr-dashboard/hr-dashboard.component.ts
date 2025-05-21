import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { RequestService } from '../../../shared/services/hrrequest/hrrequest.service';
import { Skeleton } from 'primeng/skeleton';
@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
    Skeleton
  ],
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
export class HrDashboardComponent implements OnInit {
  // Data properties
  requests: any[] = [];
  selectedRequests: any[] = [];
  loading: boolean = true;
  activeTab: string = 'all';

  // Pagination properties
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  rowsPerPageOptions = [10, 50, 137];

  // Tab counts
  allCount: number = 0;
  pendingCount: number = 0;
  approvedCount: number = 0;
  declinedCount: number = 0;

  // Current page and pagination helper properties
  currentPage = 1;
  totalPages = 0;
  visiblePages: number[] = [];
  lastPages: number[] = [];
  showEllipsis = false;

  constructor(
    private requestService: RequestService,
    private messageService: MessageService
  ) { }


  // Lifecycle hook - on component initialization
  ngOnInit() {
    this.loadRequests();
  }

  // Returns status filter array based on active tab
  getStatusFilter(): number[] {
    switch (this.activeTab) {
      case 'pending':
        return [0];
      case 'approved':
        return [1];
      case 'declined':
        return [2];
      default:
        return [];
    }
  }

  // Loads requests from service with current filters and pagination
  loadRequests() {
    this.loading = true;
    const status = this.getStatusFilter();

    this.requestService.getRequests(status, this.first, this.rows).subscribe({
      next: (response) => {
        this.requests = response.list;
        this.totalRecords = response.total;

        // Update counts for each tab
        this.allCount = response.total_without_filter || 0;
        this.pendingCount = response.pending_without_filter || 0;
        this.approvedCount = response.accepted_without_filter || 0;
        this.declinedCount = response.declined_without_filter || 0;

        // Add total to rowsPerPageOptions if not included
        const total = this.totalRecords;
        const existingOptions = [10, 50, 100];
        this.rowsPerPageOptions = existingOptions.filter(opt => opt < total);
        this.rowsPerPageOptions.push(total);

        // Calculate total pages and current page
        this.totalPages = Math.ceil(total / this.rows);
        this.currentPage = Math.floor(this.first / this.rows) + 1;

        this.updatePaginationView();
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load requests',
          life: 5000,
        });
        this.loading = false;
      },
    });
  }

  getSkeletonRows(): any[] {
    return new Array(10).fill({});
  }

  // Updates pagination buttons and ellipsis visibility
  updatePaginationView() {
    const total = this.totalPages;
    const current = this.currentPage;

    this.showEllipsis = false;
    this.visiblePages = [];
    this.lastPages = [];

    if (total <= 5) {
      // Case: total pages are 5 or fewer
      this.visiblePages = Array.from({ length: total }, (_, i) => i + 1);
      return;
    }

    // Always show the last 3 pages
    this.lastPages = [total - 2, total - 1, total];

    if (current <= 3) {
      // Case: User is at the beginning
      this.visiblePages = [1, 2, 3];
      this.showEllipsis = true;
    } else if (current >= total - 2) {
      // Case: User is at the end
      this.visiblePages = [];
      this.showEllipsis = true;
    } else {
      // Case: User is in the middle
      this.visiblePages = [current - 1, current, current + 1];
      this.showEllipsis = true;
    }
  }

  // Handle tab change event
  onTabChange(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.first = 0; // Reset to first page
      this.loadRequests();
    }
  }

  // Handle page change event from pagination controls
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadRequests();
  }

  // Returns color hex code based on status number
  getStatusColor(status: number): string {
    switch (status) {
      case 0:
        return '#DC6803';
      case 1:
        return '#039855';
      case 2:
        return '#D92D20';
      default:
        return '';
    }
  }

  // Returns readable label for status
  getStatusLabel(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Declined';
      default:
        return 'Unknown';
    }
  }

  // Returns CSS class name based on request type
  getRequestTypeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'loan':
        return 'loan-color';
      case 'excuse':
        return 'excuse-color';
      case 'overtime':
        return 'overtime-color';
      case 'vacation':
        return 'vacation-color';
      default:
        return 'default-color';
    }
  }

  // Checks if a value is numeric
  isNumeric(value: any): boolean {
    if (typeof value === 'number') return true;
    if (typeof value === 'string') {
      return !isNaN(Number(value)) && !isNaN(parseFloat(value));
    }
    return false;
  }

  // Changes to a specific page and reloads requests
  changePage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.first = (page - 1) * this.rows;
    this.loadRequests();
  }
}
