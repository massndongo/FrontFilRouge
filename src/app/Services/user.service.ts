import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { ProfilService } from '../Services/profil.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private profilService: ProfilService) { }

  profils = this.profilService.getProfils();

  users: User[] = [
    {
      id:1,
      nom: "Ndongo",
      prenom: "Massam",
      email: "mass@mail.com",
      username: "mass",
      password: "123",
      profil: this.profils[0]
    },
    {
      id:2,
      nom: "gueye",
      prenom: "asna",
      email: "asna@mail.com",
      username: "asna",
      password: "123",
      profil: this.profils[3]
    }
  ];

  getUsers(){
    return this.users;
  }

}
