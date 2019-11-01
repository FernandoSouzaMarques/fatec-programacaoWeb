import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../turma.service';
import { MatDialog } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.scss']
})
export class TurmaListComponent implements OnInit {

  constructor(
    private turmaSrv: TurmaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  turmas: any = [];
  displayedColumns: string[] = ['nome', 'curso', 'professor', 'dia_semana', 'horario', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.turmas = await this.turmaSrv.listar();
      console.log(this.turmas);
      
    }
    catch(erro) {
      console.error(erro);
      
    }
  }

  async excluir(id: string) {
    try {
      const dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: {question: 'Deseja realmente excluir esta turma? Não terá como reverter essa ação!'}
      });

      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await  this.turmaSrv.excluir(id);
        this.ngOnInit(); //Força o recarregamento da lista de turmas
        this.snackBar.open('Turma excluida com sucesso 😃!', 'Ok', {
          duration: 4000,
        });
      }

    }
    catch(erro) {
      console.error(erro);
      this.snackBar.open('Não foi possível excluir o turma 😥! Entre em contato com o suporte técnico.', 'Ok', {
        duration: 4000,
      })
    }
  }

}
{}