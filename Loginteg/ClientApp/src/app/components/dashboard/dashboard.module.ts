import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TareasComponent } from './tareas/tareas.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FileUploadComponent } from '../upload-file/upload-file.component';
import { DetalleClienteComponent } from './clientes/detallecliente/detallecliente.component';
import { CrmComponent } from './clientes/crm/crm.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { RelacionarClienteComponent } from './clientes/relacionar-cliente/relacionar-cliente.component';
import { ComboBuscadorComponent } from './usuarios/combo-buscador/combo-buscador.component';
import { ComboBuscadorComponent2 } from './usuarios/combo-buscador2/combo-buscador2.component';
import { ContactosComponent } from './contactos/contactos.component';
import { CrearContactoComponent } from './contactos/crear-contacto/crear-contacto.component';
import { MultiComboBuscadorComponent } from './usuarios/multi-combo-buscador/multi-combo-buscador.component';
import { CrearTareaComponent } from './tareas/crear-tarea/crear-tarea.component';
import { CrearProyectoComponent } from './proyectos/crear-proyecto/crear-proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { InteraccionesComponent } from './interacciones/interacciones.component';
import { InteraccionCardComponent } from './interacciones/interaccion-card/interaccion-card.component';
import { CrearInteraccionComponent } from './interacciones/crear-interaccion/crear-interaccion.component';
import { MultiArchivoComponent } from '../multi-archivo/multi-archivo.component';
import { CrearRolesComponent } from './mantenedores/mantenedor-roles/crear-roles/crear-roles.component';
import { DashboardRoles } from './mantenedores/mantenedor-roles/dashboard-roles/dashboard-roles.component';
import { EditarRolesComponent } from './mantenedores/mantenedor-roles/editar-roles/editar-roles.component';
import { DashboardRazonSocialComponent } from './mantenedores/mantenedor-razon-social/dashboard-razon-social/dashboard-razon-social.component';
import { CrearRazonSocialComponent } from './mantenedores/mantenedor-razon-social/crear-razon-social/crear-razon-social.component';
import { EditarRazonSocialComponent } from './mantenedores/mantenedor-razon-social/editar-razon-social/editar-razon-social.component';
import { DashboardCargosComponent } from './mantenedores/mantenedor-cargos/dashboard-cargos/dashboard-cargos.component';
import { CrearCargosComponent } from './mantenedores/mantenedor-cargos/crear-cargos/crear-cargos.component';
import { EditarCargosComponent } from './mantenedores/mantenedor-cargos/editar-cargos/editar-cargos.component';
import { DashboardDepartamentosComponent } from './mantenedores/mantenedor-departamentos/dashboard-departamentos/dashboard-departamentos.component';
import { CrearDepartamentosComponent } from './mantenedores/mantenedor-departamentos/crear-departamentos/crear-departamentos.component';
import { EditarDepartamentosComponent } from './mantenedores/mantenedor-departamentos/editar-departamentos/editar-departamentos.component';
import { DashboardMediosContactoComponent } from './mantenedores/mantenedor-medios-contacto/dashboard-medios-contacto/dashboard-medios-contacto.component';
import { CrearMediosContactoComponent } from './mantenedores/mantenedor-medios-contacto/crear-medios-contacto/crear-medios-contacto.component';
import { EditarMediosContactoComponent } from './mantenedores/mantenedor-medios-contacto/editar-medios-contacto/editar-medios-contacto.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    UsuariosComponent,
    NavbarComponent,
    TareasComponent,
    CrearTareaComponent,
    ClientesComponent,
    DetalleClienteComponent,    
    CrearUsuarioComponent,
    FileUploadComponent,
    CrmComponent,
    CrearClienteComponent,
    RelacionarClienteComponent,
    ComboBuscadorComponent,
    ComboBuscadorComponent2,
    ContactosComponent,
    CrearContactoComponent,
    MultiComboBuscadorComponent,
    CrearProyectoComponent,
    ProyectosComponent,
    InteraccionesComponent,
    InteraccionCardComponent,
    CrearInteraccionComponent,
    MultiArchivoComponent,
    DashboardRoles,
    CrearRolesComponent,
    EditarRolesComponent,
    DashboardRazonSocialComponent,
    CrearRazonSocialComponent,
    EditarRazonSocialComponent,
    DashboardCargosComponent,
    CrearCargosComponent,
    EditarCargosComponent,
    DashboardDepartamentosComponent,
    CrearDepartamentosComponent,
    EditarDepartamentosComponent,
    DashboardMediosContactoComponent,
    CrearMediosContactoComponent,
    EditarMediosContactoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatProgressBarModule,
    SharedModule    
  ]
})
export class DashboardModule { }
