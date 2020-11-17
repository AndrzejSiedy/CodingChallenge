import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';
import { DataService } from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private dataService: DataService, private configService: ConfigService) {
    }

}
