import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {

  constructor(private professorSrv: ProfessorService) { }

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
    if(confirm('Deseja realmente excluir?')) {
      try {
        await  this.professorSrv.excluir(id);
        this.ngOnInit(); //Força o recarregamento da lista de professores
        alert('Excluido com sucesso!');
      }
      catch(erro) {
        console.error(erro);
        alert('Erro ao excluir!');
        
      }
    }
  }

}
{}