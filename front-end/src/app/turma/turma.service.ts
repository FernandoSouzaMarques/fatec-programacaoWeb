import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  // Um onjeto da classe HttpClient é injetado como dependência da classe TurmaService.
  // Isso é chamado de INJEÇÃO DE DEPENDÊNCIA.
  constructor(private http: HttpClient) { }

  private entryPoint: string = 'turma';

  listar() {
    // toPromisse() permite que a chamada a esse método seja utilizada com async/await
    return this.http.get(env.apiBaseUri + this.entryPoint).toPromise();
  }

  excluir(id: string) {
    return this.http.request('delete', env.apiBaseUri + this.entryPoint, {body: {_id: id}}).toPromise();
  }

  novo(turma: string) {
    return this.http.post( env.apiBaseUri + this.entryPoint, turma).toPromise();
  }

  obterUm(id: string) {
    return this.http.get(`${env.apiBaseUri}${this.entryPoint}/${id}`).toPromise();
  }

  atualizar(turma: any) {
    return this.http.put(`${env.apiBaseUri}${this.entryPoint}`, turma).toPromise();
  }
}
