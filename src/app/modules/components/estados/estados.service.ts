import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'


import { Estado, EstadoFull } from './estados.model';

	@Injectable({
		providedIn: 'root'
	})

	export class EstadosService {

  		baseUrl = `${environment.baseUrl}/estados`
  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {		
		}
    
		read(): Observable<EstadoFull[]> {   			
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})	
			return this.httpCliente.get<EstadoFull[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Estado> {
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/${id}`
			return this.httpCliente.get<Estado>(url,{ headers: headers})
		}
		
		create(estado: Estado): Observable<Estado> {
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/add`
			return this.httpCliente.post<Estado>(url, estado, { headers: headers})
		}
		
		update(estado: Estado): Observable<Estado> {
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/update/${estado.estado_id}`
			return this.httpCliente.put<Estado>(url, estado, { headers:headers})
		}		
}
