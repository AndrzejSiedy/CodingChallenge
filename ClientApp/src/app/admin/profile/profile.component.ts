import { Component, OnInit } from '@angular/core';
import { Inmate } from '../../models/models';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private backupInmate: Inmate;
    public isCreate = false;
    public isEdit = true;

    inmate: Inmate = {} as Inmate;
    locations: string[];
    gender: string[] = ['male', 'female'];
    dob: FormControl;
    intakeDateTime: FormControl;
    
    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit() {
        this, this.dataService.getLocations().subscribe((resp) => {
            this.locations = resp;
        });

        this.route.url.subscribe(params => {
            this.isCreate = params.filter(urlPath => urlPath.path.toLowerCase() === 'create').length > 0;
            this.isEdit = !this.isCreate;
            this.dob = new FormControl(new Date());
            console.warn('isCreate', this.isCreate);
        });

        this.route.params.subscribe(params => {
            if (this.isEdit) {
                const id = +params['id'];
                this.inmate = this.dataService.getInmate(id);
                this.intakeDateTime = new FormControl(this.inmate.intakeDateTime);
            }
            else {
                this.intakeDateTime = new FormControl(new Date());
            }
            this.backupInmate = Object.assign({}, this.inmate);
        });
    }

    onBtnSaveClicked() {
        this.inmate.intakeDateTime = new Date(this.intakeDateTime.value);
        if (this.isCreate) {
            this.inmate.dob = new Date(this.dob.value);

            this.dataService.create(this.inmate);
        }

        this.router.navigate(['/admin']);
    }

    onBtnCancelClicked() {
        if (!this.isCreate) {
            this.inmate.cellNumber = this.backupInmate.cellNumber;
            this.inmate.currentLocation = this.backupInmate.currentLocation;
            this.inmate.dob = this.backupInmate.dob;
            this.inmate.gender = this.backupInmate.gender;
            this.inmate.id = this.backupInmate.id;
            this.inmate.imgUrl = this.backupInmate.imgUrl;
            this.inmate.intakeDateTime = this.backupInmate.intakeDateTime;
            this.inmate.locationHistory = this.backupInmate.locationHistory;
            this.inmate.name = this.backupInmate.name;
            this.inmate.nationality = this.backupInmate.nationality;
            this.inmate.title = this.backupInmate.title;
        }
        this.router.navigate(['/admin']);
    }
}
