import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../professor.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {

  constructor(
    private professorSrv: ProfessorService,
    private router: Router,
    private dialog: MatDialog,
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
      this.router.navigate(['/professor']);
    }
  }
}
