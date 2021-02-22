// import { DatePipe } from '@angular/common';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { Router } from '@angular/router';
// import { Client } from 'app/components/Models/client.models';
// import { ClientService } from 'app/components/service/client.service';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

}

// @Component({
//     selector: 'app-profile',
//     templateUrl: './profile.component.html',
//     styleUrls: ['./profile.component.scss']
// })

// export class ProfileComponent implements OnInit {
    

//     @ViewChild('picker') picker: any;
  
//     isLoadingResults = false;
//     clientForm: FormGroup;
  
  
//     constructor(private router: Router, private service: ClientService, private formBuilder: FormBuilder) {
//       this.reactiveForm();
//     }
  
//     ngOnInit(): void {
//     }
//     reactiveForm(): void {
//       this.clientForm = this.formBuilder.group({ // construct a new instance of FormGroup
//         Nom: ['', Validators.required],
//         Prenom: ['', Validators.required],
//         Telephone: ['', Validators.required],
//         Email:  ['', Validators.required],
//         CIN : ['', Validators.required],
//         Login:['', Validators.required],
//     Password:['', Validators.required],

//     });
//     }
//     onSubmit(): void {
//       const body = this.clientForm.value;
//       this.isLoadingResults = true;
//       this.service.addClient(body)
//         //  .subscribe((res: Client) => {
//         //     const id = res.id;
//         //     this.isLoadingResults = false;
//         //     this.router.navigate(['/competition-details', id]);
//         //   }, (err: any) => {
//         //     console.log(err);
//         //     this.isLoadingResults = false;
//         //   });
//     }
//     onReset(): void {
//       this.clientForm.reset();
//   }
  

// }
