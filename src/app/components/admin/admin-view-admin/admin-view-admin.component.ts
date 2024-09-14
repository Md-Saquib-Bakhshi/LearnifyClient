import { Component } from '@angular/core';
import { adminModel } from '../../../models/adminModel';
import { AdminService } from '../../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-view-admin',
  templateUrl: './admin-view-admin.component.html',
  styleUrl: './admin-view-admin.component.css'
})
export class AdminViewAdminComponent {
  allAdmin: adminModel[] = [];
  selectedAdmin: adminModel | null = null;
  updateData: adminModel = {} as adminModel;
  loading: boolean = false;
  loadingTemporary: boolean = false;

  constructor(
    private viewAdminService: AdminService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.startLoading();
    this.viewAdminService.getAllAdmin().subscribe({
      next: (admins) => {
        this.allAdmin = admins;
        this.stopLoading();
        console.log(this.allAdmin);
      },
      error: (error) => {
        this.stopLoading();
        console.error('Error fetching admins:', error);
        this.toastr.error('Failed to fetch admins', 'Error');
      }
    });
  }

  startLoading(): void {
    this.loading = true;
    this.loadingTemporary = true;
    setTimeout(() => {
      this.loadingTemporary = false;
    }, 1000);
  }

  stopLoading(): void {
    setTimeout(() => {
      this.loading = false;
    }, this.loadingTemporary ? 1000 : 0);
  }

  selectAdminForUpdate(admin: adminModel): void {
    this.selectedAdmin = admin;
    this.updateData = { ...admin };
  }

  updateAdmin(): void {
    if (this.selectedAdmin && this.updateData) {
      this.startLoading();
      this.viewAdminService.updateAdmin(this.selectedAdmin.email, this.updateData).subscribe({
        next: (response) => {
          this.stopLoading();
          console.log('Admin updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadAdmins();
          this.selectedAdmin = null;
        },
        error: (error) => {
          this.stopLoading();
          console.error('Error updating admin:', error);
          this.toastr.error('Failed to update admin', 'Error');
        }
      });
    }
  }

  deleteAdmin(email: string): void {
    const initialState = {
      onConfirm: () => {
        this.startLoading();
        this.viewAdminService.deleteAdmin(email).subscribe({
          next: (response) => {
            this.stopLoading();
            console.log('Admin deleted successfully', response);
            this.allAdmin = this.allAdmin.filter(s => s.email !== email);
            this.toastr.success('Deleted successfully', 'Success');
          },
          error: (error) => {
            this.stopLoading();
            console.error('Error deleting admin:', error);
            this.toastr.error('Failed to delete admin', 'Error');
          }
        });
      },
      onDecline: () => {}
    };

    this.modalService.show(ConfirmDialogComponent, { initialState });
  }
}
