import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, first } from 'rxjs/operators';
import { Gender, Lov, Nationality, ServiceResponse, Title, User } from '../../models/models';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';

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
    public isDirty = false;

    public userForm: FormGroup;

    public minDate = new Date('01-01-1900');
    public maxDate = new Date('01-01-2019');
    private dialogConfig;

    constructor(private router: Router, private route: ActivatedRoute, private location: Location,
        private userService: UserService, private configService: ConfigService, private dialog: MatDialog,
        private errorService: ErrorHandlerService) {

        const config = this.configService.viewConfig;
        this.gender = config.gender;
        this.title = config.title;
        this.nationality = config.nationalities;

        this.resetComponent();
    }

    ngOnInit() {
        this.resetComponent();

        this.userForm = new FormGroup({
            title: new FormControl(''),
            fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
            lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
            dob: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            nationality: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        this.route.url
            .pipe(first())
            .subscribe(params => {
                this.isCreate = params.filter(urlPath => urlPath.path.toLowerCase() === 'create').length > 0;
                this.isEdit = !this.isCreate;
            });


        const userId = this.route.snapshot.params['id'];
        this.userService.getUser(userId)
            .pipe(first())
            .subscribe(resp => {
                if (this.isEdit) {
                    const serviceResp = resp as ServiceResponse<User>;
                    if (serviceResp.data && !serviceResp.error) {
                        this.user = serviceResp.data;
                        this.backupUser = { ...this.user }
                        this.setForm(this.user);
                    }
                    else {
                        this.showErrorDialog(serviceResp.error);
                    }

                }
            },
                (error => {
                    this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                }))

        //this.route.data
        //    .pipe(first())
        //    .subscribe(resp => {
        //        if (this.isEdit) {
        //            const serviceResp = resp.serviceResponse as ServiceResponse<User>;
        //            if (serviceResp.data && !serviceResp.error) {
        //                this.user = serviceResp.data;
        //                this.backupUser = { ...this.user }
        //                this.setForm(this.user);
        //            }
        //            else {
        //                this.showErrorDialog(serviceResp.error);
        //            }
        //        }
        //    });
    }

    private setForm(user: User) {
        this.setValue('title', user.name.title);
        this.setValue('fname', user.name.first);
        this.setValue('lname', user.name.last);
        this.setValue('dob', user.dob.date);
        this.setValue('gender', user.gender);
        this.setValue('nationality', user.nationality);
        this.setValue('email', user.email);
    }

    private getValue = (controlName: string) => {
        return this.userForm.controls[controlName].value;
    }

    private setValue = (controlName: string, value: any) => {
        this.userForm.controls[controlName].setValue(value);
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    public getUserForm(): User {
        const user = {
            id: this.user.id,
            dob: { date: this.getValue('dob') },
            name: {
                title: this.getValue('title'),
                first: this.getValue('fname'),
                last: this.getValue('lname')
            },
            email: this.getValue('email'),
            gender: this.getValue('gender'),
            nationality: this.getValue('nationality'),
            // for this project copy original pictures
            picture: this.user.picture
        } as User

        return user;
    }

    private resetComponent() {
        this.dialogConfig = {
            height: '400px',
            width: '600px',
            disableClose: true,
            data: {}
        }

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
        const formUser = this.getUserForm();
        if (this.isEdit) {
            if (formUser.dob.date !== this.user.dob.date ||
                formUser.email !== this.user.email ||
                formUser.gender !== this.user.gender ||
                formUser.name.first !== this.user.name.first ||
                formUser.name.last !== this.user.name.last ||
                formUser.name.title !== this.user.name.title
            ) {
                this.userService.update(formUser).subscribe(resp => {
                    if (!resp.error) {
                        const msg = `user ${resp.data.name.first} updated`;
                        console.warn(msg);
                        this.showSuccessDialog();
                    }
                    else {
                        alert(resp.error);
                        this.showErrorDialog(resp.error);
                    }
                },
                    (error => {
                        this.errorService.dialogConfig = { ...this.dialogConfig };
                        this.errorService.handleError(error);
                    }));
            }
        }
        else {
            const user = {
                dob: formUser.dob,
                email: formUser.email,
                gender: formUser.gender,
                name: formUser.name,
                nationality: formUser.nationality
            } as User;
            this.userService.create(user)
                .subscribe(resp => {
                    const msg = `user ${resp.data.name.first} created`;
                    console.warn(msg);
                    this.showSuccessDialog();
                }, (error => {
                    this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                }));
        }
    }

    onBtnCancelClicked = () => {
        // shallow copy - setting back properties
        Object.keys(this.backupUser).forEach((key) => {
            this.user[key] = this.backupUser[key]
        });

        this.router.navigate(['/user']);
    }

    showSuccessDialog = () => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
            .subscribe(result => {
                this.router.navigate(['/user']);
            });
    }

    showErrorDialog = (errorMsg) => {
        const dialogCfg = { ... this.dialogConfig };
        dialogCfg.data = { errorMessage: errorMsg };
        const dialogRef = this.dialog.open(ErrorDialogComponent, dialogCfg);
        dialogRef.afterClosed()
            .subscribe(result => {
                this.router.navigate(['/user']);
            });
    }
}
