import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../turma.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { ProfessorService } from '../../professor/professor.service';
import { CursoService } from '../../curso/curso.service';

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
    private dialog: MatDialog,
    private professorSrv: ProfessorService,
    private cursoSrv: CursoService

  ) { }
  title: string = 'Nova turma';
  turma: any = {};
  professores: any = [];
  cursos: any = [];

  diasSemana: any = [
    { _id: 'Segunda', nome: 'Segunda-Feira'},
    { _id: 'Terça', nome: 'Terça-Feira'},
    { _id: 'Quarta', nome: 'Quarta-Feira'},
    { _id: 'Quinta', nome: 'Quinta-Feira'},
    { _id: 'Sexta', nome: 'Sexta-Feira'},
    { _id: 'Sábado', nome: 'Sábado'}
  ]
  
  async ngOnInit() {
    try {
      let params = this.actRoute.snapshot.params;
      
      if (params['id']) {
        this.turma = await this.turmaSrv.obterUm(params['id']);
        this.title = 'Editando turma';
      }

      this.professores = await this.professorSrv.listar();
      this.cursos = await this.cursoSrv.listar();
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
  async voltar(form: NgForm) {
    //form.dirty -> o formulário foi alterado via código (está "sujo");
    //form.touched -> o formulário foi alterado pelo usuário;
    let result = true;
    if (form.dirty && form.touched) {
      try {
        const dialogRef = this.dialog.open(ConfirmDlgComponent, {
          width: '50%',
          data: {question: 'Há dados não salvos. Deseja realmente voltar?'}
        });

        result = await dialogRef.afterClosed().toPromise();
      }
      catch(error) {
        console.error(error);
      }
    }

    if (result) {
      this.router.navigate(['/turma']);
    }
  }
}
