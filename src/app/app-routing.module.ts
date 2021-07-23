import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { GroupedQueryComponent } from './components/grouped-query/grouped-query.component';
import { TablaInfoComponent } from './components/tabla-info/tabla-info.component';

const routes: Routes = [
  {path: 'agregar', component: FormularioComponent},
  {path: 'informacion', component: TablaInfoComponent},
  {path: 'consulta', component: GroupedQueryComponent},
  {path: '**', redirectTo:'agregar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = []