import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-info',
  templateUrl: './tabla-info.component.html',
  styleUrls: ['./tabla-info.component.css']
})
export class TablaInfoComponent implements OnInit {

  response:any;
  personDataById:any;
  closeResult: string;
  title:string='Tabla Personas'
  myId:number;
  personBirthDate:any;
  responseZona:any=[];
  selectedLevel:number;
  zonas:any=[];
  isDisabled=true

  constructor(
    private personaService:PersonasService, 
    private modalService: NgbModal, 
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    // retrieving all data from api/personas
    this.personaService.getPersonas().subscribe(res => {
      // console.log(res);
      this.response = res;
    });

    //retrieving all from api/zonas
    this.personaService.getZona().subscribe(
      res => this.responseZona = res
    );
  }

  getById(content:any, currentId:number){
    // using service to get data from the api by id
    this.personaService.getPersonById(currentId).subscribe(res => {
      this.personDataById = res;
      
      // transformar formato de fecha
      this.personBirthDate = this.personDataById.f_nacimiento;
      this.personBirthDate = new Date(this.personBirthDate);
      this.personBirthDate = this.datePipe.transform(this.personBirthDate,"yyyy-MM-dd")
      
      // this.myId= this.personDataById.id;

      // mostrar modal
      this.showModal(content);
    });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showModal(content:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectedOption(){
    this.zonas = [] 
    for(let x of this.responseZona) if(x.cod_sector == this.selectedLevel) this.zonas.push(x)
  }

  update(data:any){
    console.log(data)
    this.personaService.updateData(data).subscribe();
    // console.log(data);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registro actualizado!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  delete(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas eliminar este registo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: 'Registro eliminado!',
            showConfirmButton: false,
            timer: 1500
          }
        )
        this.personaService.deleteRecord(id).subscribe();
        let row = document.getElementById(id.toString())!;
        row.remove();
      }
    })
    
  }
}
