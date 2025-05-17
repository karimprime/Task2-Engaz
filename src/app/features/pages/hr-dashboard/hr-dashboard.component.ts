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
  ],
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
export class HrDashboardComponent implements OnInit {
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

  constructor(
    private requestService: RequestService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

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

  loadRequests() {
    this.loading = true;
    const status = this.getStatusFilter();

    this.requestService.getRequests(status, this.first, this.rows).subscribe({
      next: (response) => {
        this.requests = response.list;
        this.totalRecords = response.total;

        // Update tab counts (assuming API provides these)
        this.allCount = response.total_without_filter || 0;
        this.pendingCount = response.pending_without_filter || 0;
        this.approvedCount = response.accepted_without_filter || 0;
        this.declinedCount = response.declined_without_filter || 0;

        this.loading = false;
      },
      error: (error) => {
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

  onTabChange(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.first = 0;
      this.loadRequests();
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadRequests();
  }

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

  isNumeric(value: any): boolean {
    if (typeof value === 'number') return true;
    if (typeof value === 'string') {
      return !isNaN(Number(value)) && !isNaN(parseFloat(value));
    }
    return false;
  }
}
