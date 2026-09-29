import { Injectable, Service } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
 providedIn: 'root'
})

export class Servicio {
    private users:Usuario[]=[
        {id:1, name:'juan', email:'juan@gmail.com', active:true},
        {id:2, name:'maria', email:'maria@gmail.com', active:false},
        {id:3, name:'luis', email:'luis@gmail.com', active:true},
    ];

    async getUsuarios(): Promise<Usuario[]>{
        return new Promise(resolve=>{setTimeout(()=>{resolve(this.users);}, 1000);});
    }
}
