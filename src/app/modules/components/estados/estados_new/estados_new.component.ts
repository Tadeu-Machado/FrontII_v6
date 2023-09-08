
import { Estado } from './../estados.model';
import { EstadosService } from './../estados.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import { Pais } from '../../paises/paises.model';
import { PaisesService } from '../../paises/paises.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-estado-create',
    templateUrl: './estados_new.component.html',
    styleUrls: ['./estados_new.component.css'],
    providers: [MessageService]
})

export class EstadosNewComponent implements OnInit {
    paises: Pais[];
    selectedPais: Pais | undefined;

    formGroup: FormGroup | undefined;

    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    estado: Estado = {
        nome : "",
        sigla : "",
        pais_id: null,
        estado_id: null
    }
        
    constructor(private loginService: LoginService, private paisesService: PaisesService,private estadosService: EstadosService, private router: Router, public messageService: MessageService,) {
        this.loginService.validateSession()
    }

    
    ngOnInit(): void {
        this.paisesService.read().subscribe(paises => {
            this.paises = paises;          
        });

        this.formGroup = new FormGroup({
            selectedPais: new FormControl<object | null>(null)
        });

        // Componente Breadcrumb
        this.items = [{ label: 'Estados', routerLink: '/estados' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    /*
    setTimeout(() => {
        if (!this.loginService.sessionIsValid){
        this.router.navigate(['/'])
        } 
    }, 200)
    */
    }
    
    create(): void {

        this.estado.nome = this.estado.nome.toUpperCase().trim();
        this.estado.sigla = this.estado.sigla.toUpperCase().trim();
        this.estado.pais_id = this.selectedPais.pais_id;

        this.estadosService.create(this.estado).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/estados'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => {
                console.log(e.error['message err'])  
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
    }
    
    cancel(): void {       
        this.router.navigate(['/estados'])
    }
    

}