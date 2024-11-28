import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Ticket {
  ticketId: string,
  ticketName: string,
  status: string,
}

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent {
  currentItem: Ticket | null = null;

  ticketArray: Ticket[] = [
    { ticketId: 'Jira-003', ticketName: 'Layout-Page', status: 'In Progress' },
    { ticketId: 'Jira-005', ticketName: 'Reset Password', status: 'To Do' },
    { ticketId: 'Jira-006', ticketName: 'Home Page', status: 'To Do' },
    { ticketId: 'Jira-008', ticketName: 'Employee List', status: 'Completed' },
    { ticketId: 'Jira-009', ticketName: 'Company List', status: 'In Progress' },
    { ticketId: 'Jira-010', ticketName: 'Employee Details', status: 'To Do' },
    { ticketId: 'Jira-012', ticketName: 'Digital-Page', status: 'Completed' },
    { ticketId: 'Jira-013', ticketName: 'DashBoard', status: 'Completed' },
    { ticketId: 'Jira-014', ticketName: 'Task List', status: 'In Progress' },
    { ticketId: 'Jira-015', ticketName: 'Attendance List', status: 'To Do' },
    { ticketId: 'Jira-017', ticketName: 'Holiday List', status: 'To Do' },
  ];

  filterTaskList(status: string): Ticket[] {
    return this.ticketArray.filter((m) => m.status === status);
  }

  onDragStart(item: Ticket) {
    this.currentItem = item;
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    if (this.currentItem) {
      const record = this.ticketArray.find((m) => m.ticketId === this.currentItem!.ticketId);
      if (record) {
        record.status = status; 
      }
      this.currentItem = null; 
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

}
