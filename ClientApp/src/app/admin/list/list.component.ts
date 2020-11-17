import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Inmate, ServiceResponse } from '../../models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, { static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('input', { static: false }) input: ElementRef;
    pageEvent: PageEvent;

    data: ServiceResponse<Inmate[]>;

    dataSource: MatTableDataSource<Inmate>;
    displayedColumns: string[] = ['id', 'name', 'dob', 'cellNumber', 'intakeDateTime', 'currentLocation', 'utils'];

    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Inmate>();
        this.dataService.getAllInmates()
            .subscribe(res => {
                this.data = res;
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

    onCellClick = (row: Inmate) => {
        this.router.navigate(['/admin/edit', row.id]);
    }

    onDelete(inmate: Inmate) {
        this.dataService.delete(inmate).subscribe(res => {
            this.data = res;
            this.dataSource.data = this.data.data;
        });
    }
}
