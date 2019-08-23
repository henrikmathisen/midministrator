import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  submitted = false;
  role: Role;
  errors: [];

  constructor(public roleService: RoleService, private route: ActivatedRoute, private location: Location) {
    
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.roleService.getRole(id).subscribe({
        next: role => { this.role = role; },
        error: msg => { console.error(msg); }
      });
    } else {
      this.role = new Role();
    }
   
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.role.id > 0) {
      this.roleService.updateRole(this.role).subscribe({
        next: msg => { this.location.back(); },
        error: msg => { console.error(msg); this.submitted = false; }
      })
    } else {
      this.roleService.createRole(this.role).subscribe({
        next: msg => { this.location.back(); },
        error: msg => { console.error(msg); this.submitted = false; }
      })
    }
  }
}
