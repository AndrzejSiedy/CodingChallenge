import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Gender, Lov, Nationality, Title, User } from '../../models/models';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User;
    private backupUser: User;
    public isCreate = false;
    public isEdit = true;

    public gender: Lov[];
    public title: Lov[];
    public nationality: Lov[];

    dob: FormControl;

    constructor(private router: Router, private route: ActivatedRoute,
        private userService: UserService, private configService: ConfigService) {

        const config = this.configService.viewConfig;
        this.gender = config.gender;
        this.title = config.title;
        this.nationality = config.nationalities;

        this.resetComponent();
    }

    ngOnInit() {
        this.resetComponent();

        this.route.url
            .pipe(first())
            .subscribe(params => {
            this.isCreate = params.filter(urlPath => urlPath.path.toLowerCase() === 'create').length > 0;
            this.isEdit = !this.isCreate;
        });

        this.route.data
            .pipe(first())
            .subscribe(resp => {
                this.user = resp.editUser as User;
                this.backupUser = { ...this.user }
        });
    }

    private resetComponent() {
        const avatar = '../../../assets/avatar.png';
        this.user = {
            id: 0,
            dob: { age: 0, date: new Date() },
            email: null,
            gender: Gender.Male,
            name: { first: null, last: null, title: Title.Mr },
            nationality: Nationality.DK,
            picture: { large: avatar, medium: avatar, thumbnail: avatar },
            title: Title.Mr
        } as User;

        this.backupUser = {} as User;
        this.isCreate = false;
        this.isEdit = true;
    }

    onBtnSaveClicked = () => {
    }

    onBtnCancelClicked = () => {
        // shallow copy - setting back properties
        Object.keys(this.backupUser).forEach((key) => {
            this.user[key] = this.backupUser[key]
        });
        
        this.router.navigate(['/user']);
    }

}
