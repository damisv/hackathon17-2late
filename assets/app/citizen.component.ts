import {Component} from "@angular/core";

@Component({
    selector: 'citizen-component',
    template: `
        <ul style="list-style: none;position:fixed;margin-top: 20%;margin-left: 0px;z-index:100;">
            <li style="padding-bottom:5%;"><a md-fab [routerLink]="['homepage']" color="primary" mdTooltip="Homepage" ><md-icon>home</md-icon></a></li>
            <li style="padding-bottom:5%;"><a md-fab [routerLink]="['complaints']" color="warn" mdTooltip="Complaints" ><md-icon>report_problem</md-icon></a></li>
            <li style="padding-bottom:5%;"><a md-fab routerLink="." mdTooltip="Suggestions"><md-icon>add</md-icon></a></li>
        </ul>


        <div class="wrapper">

            <div class="header">
                <h1 class="header-title">Complaints and Suggestions - Serres</h1>
                <p class="header-title"> This is the place where you could share your complaints and talk about the city's problems.
                    <br>Also any idea you have regarding the city improvings share it here.</p>
            </div>

            <md-card class="raised-card">

                <router-outlet></router-outlet>
                

            </md-card>

            <footer-component></footer-component>
        </div>
    `,
    styles: [`
        @import url('https://fonts.googleapis.com/css?family=Yrsa');

        .wrapper{
            height: 100%;
        }

        .header{
            font-family: 'Yrsa', serif;
            color: beige;
            font-weight: 100;
        }

        .header{
            background: url("/img/wallpaper.jpg") no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            height:75vh;
        }

        .header-title{
            padding-top: 5%;
            padding-left: 2%;
        }

        .raised-card {
            margin: -60px 30px 0px;
            border-radius: 6px;
            box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
        }
    `]
})
export class CitizenComponent{}
