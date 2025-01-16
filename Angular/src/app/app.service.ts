import { Injectable } from '@angular/core';

@Injectable()
export class Service {
    getEmployees() {
        let employees = [{
            "ID": 1,
            "FirstName": "John",
            "LastName": "Heart",
            "City": "Los Angeles"
        }, {
            "ID": 2,
            "FirstName": "Olivia",
            "LastName": "Peyton",
            "City": "Los Angeles"
        }, {
            "ID": 3,
            "FirstName": "Robert",
            "LastName": "Reagan",
            "City": "Bentonville"
        }, {
            "ID": 4,
            "FirstName": "Greta",
            "LastName": "Sims",
            "City": "Boise"
        }, {
            "ID": 5,
            "FirstName": "Brett",
            "LastName": "Wade",
            "City": "Atlanta"
        }];
        return employees;
    }
}