import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { MatDialog } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {

  constructor(
    private professorSrv: ProfessorService,
    private dialog: MatDialog) { }

  professores: any = [];
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.professores = await this.professorSrv.listar();
      console.log(this.professores);
      
    }
    catch(erro) {
      console.error(erro);
      
    }
  }

  async excluir(id: string) {
    // if(confirm('Deseja realmente excluir?')) {
    //   try {
    //     await  this.professorSrv.excluir(id);
    //     this.ngOnInit(); //Força o recarregamento da lista de professores
    //     alert('Excluido com sucesso!');
    //   }
    //   catch(erro) {
    //     console.error(erro);
    //     alert('Erro ao excluir!');
        
    //   }
    // }
    try {
      const dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: {question: 'Deseja realmente excluir este professor? Não terá como reverter essa ação!'}
      });

      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await  this.professorSrv.excluir(id);
        this.ngOnInit(); //Força o recarregamento da lista de professores
      }

    }
    catch(erro) {
      console.error(erro);
      alert('Erro ao excluir!');
    }
  }

}
{}