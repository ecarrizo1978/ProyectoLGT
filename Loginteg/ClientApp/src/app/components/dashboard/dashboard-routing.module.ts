import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { CrmComponent } from './clientes/crm/crm.component';
import { DetalleClienteComponent } from './clientes/detallecliente/detallecliente.component';
import { ContactosComponent } from './contactos/contactos.component';
//import { ContactosComponent } from './contactos/contactos.component';
//import { CrearContactoComponent } from './contactos/crear-contacto/crear-contacto.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearProyectoComponent } from './proyectos/crear-proyecto/crear-proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
/*import { CrearTareaComponent } from './tareas/crear-tarea/crear-tarea.component';*/
import { TareasComponent } from './tareas/tareas.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
//import { CrearClienteComponent } from './usuarios/crear-cliente/crear-cliente.component';
//import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AuthGuardService } from '../../services/guard.service';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';
import { DashboardRoles } from './mantenedores/mantenedor-roles/dashboard-roles/dashboard-roles.component';
import { CrearRolesComponent } from './mantenedores/mantenedor-roles/crear-roles/crear-roles.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DashboardRazonSocialComponent } from './mantenedores/mantenedor-razon-social/dashboard-razon-social/dashboard-razon-social.component';
import { CrearRazonSocialComponent } from './mantenedores/mantenedor-razon-social/crear-razon-social/crear-razon-social.component';
import { DashboardCargosComponent } from './mantenedores/mantenedor-cargos/dashboard-cargos/dashboard-cargos.component';
import { CrearCargosComponent } from './mantenedores/mantenedor-cargos/crear-cargos/crear-cargos.component';
import { DashboardDepartamentosComponent } from './mantenedores/mantenedor-departamentos/dashboard-departamentos/dashboard-departamentos.component';
import { DashboardMediosContactoComponent } from './mantenedores/mantenedor-medios-contacto/dashboard-medios-contacto/dashboard-medios-contacto.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: InicioComponent, canActivate: [AuthGuardService] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuardService] },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'crear-cliente', component: CrearClienteComponent, canActivate: [AuthGuardService] },
      //{ path: 'reportes', component: ReportesComponent },
      { path: 'tareas', component: TareasComponent, canActivate: [AuthGuardService] },
      { path: 'detalle-cliente', component: DetalleClienteComponent, canActivate: [AuthGuardService] },
      { path: 'crm-cliente', component: CrmComponent, canActivate: [AuthGuardService] },
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuardService] },
      //{ path: 'crear-tarea', component: CrearTareaComponent },
      //{ path: 'resumen', component: ResumenComponent },
      { path: 'contactos', component: ContactosComponent, canActivate: [AuthGuardService] },
      { path: 'servicio-tecnico', component: ServicioTecnicoComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard-roles', component: DashboardRoles, canActivate: [AuthGuardService] },
      { path: 'crear-roles', component: CrearRolesComponent, canActivate: [AuthGuardService] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard-razon-social', component: DashboardRazonSocialComponent, canActivate: [AuthGuardService] },
      { path: 'crear-razon-social', component: CrearRazonSocialComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard-cargos', component: DashboardCargosComponent, canActivate: [AuthGuardService] },
      { path: 'crear-cargos', component: CrearCargosComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard-departamentos', component: DashboardDepartamentosComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard-medios-contacto', component: DashboardMediosContactoComponent, canActivate: [AuthGuardService] },
      //{ path: 'crear-contacto', component: CrearContactoComponent },
      //Wild Card Route for 404 request
      {
        path: '**', pathMatch: 'full', component: NotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
