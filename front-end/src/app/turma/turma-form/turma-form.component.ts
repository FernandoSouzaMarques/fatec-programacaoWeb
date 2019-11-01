import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../turma.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

  constructor(
    private turmaSrv: TurmaService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }
  title: string = 'Novo turma';
  turma: any = {}
  
  async ngOnInit() {
    try {
      let params = this.actRoute.snapshot.params;
      
      if (params['id']) {
        this.turma = await this.turmaSrv.obterUm(params['id']);
        this.title = 'Editando turma';
      }
    }
    catch(erro) { console.error(erro) }
    
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Turma salva com sucesso 😃!'
        if (this.turma._id) {
          msg = 'Turma atualizada com sucesso 😃!'
          await this.turmaSrv.atualizar(this.turma);
        }
        else {
          await this.turmaSrv.novo(this.turma);
        }
        this.snackBar.open(msg, 'Ok', {
          duration: 4000,
        });
        this.router.navigate(['/turma']);
      }
      catch(erro) {
        console.error(erro);
        this.snackBar.open('Não foi possível salvar os dados da turma 😥! Entre em contato com o suporte técnico.', 'Ok', {
          duration: 4000,
        })
        
      }
    }
  }
}
