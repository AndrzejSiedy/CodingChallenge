import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { User, ServiceResponse } from '../../models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('input', { static: false }) input: ElementRef;
    pageEvent: PageEvent;

    data: ServiceResponse<User[]>;

    dataSource: MatTableDataSource<User>;
    displayedColumns: string[] = ['img', 'name', 'dob',  'utils'];

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<User>();

        this.userService.getUsers().subscribe(resp => {
            this.data = resp;
            this.dataSource.data = this.data.data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onCellClick = (row: User) => {
        this.router.navigate(['user/edit', row.id]);
    }

    onDelete(user: User) {
        this.userService.delete(user.id)
            .pipe(first())
            .subscribe(res => {
                if (res.data === true) {
                    this.data.data = this.data.data.filter(u => { return u.id !== user.id });
                    this.dataSource.data = this.data.data;
                }
                else {
                    alert("Failed to delete user with identifier: " + user.id);
                }
        });
    }
}
