import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {

  constructor(
    private professorSrv: ProfessorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }
  title: string = 'Novo professor';
  professor: any = {}
  
  async ngOnInit() {
    try {
      let params = this.actRoute.snapshot.params;
      
      if (params['id']) {
        this.professor = await this.professorSrv.obterUm(params['id']);
        this.title = 'Editando professor';
      }
    }
    catch(erro) { console.error(erro) }
    
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Professor salvo com sucesso 😃!'
        if (this.professor._id) {
          msg = 'Professor atualizado com sucesso 😃!'
          await this.professorSrv.atualizar(this.professor);
        }
        else {
          await this.professorSrv.novo(this.professor);
        }
        this.snackBar.open(msg, 'Ok', {
          duration: 4000,
        });
        this.router.navigate(['/professor']);
      }
      catch(erro) {
        console.error(erro);
        this.snackBar.open('Não foi possível salvar os dados do professor 😥! Entre em contato com o suporte técnico.', 'Ok', {
          duration: 4000,
        })
        
      }
    }
  }
}
