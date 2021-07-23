import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  // nombreInput :string;f_nacInput :string;sectorInput :string = 'Seleccione';
  // sueldoInput :number;
  title='Agregar registro'
  sectores:any =[1, 2, 3, 4]
  responseZona:any = [];
  zonas:any=[];
  selectedLevel:number;

  awesomeForm: FormGroup;

  constructor(private personaService:PersonasService, private fb: FormBuilder) {
    // console.log(this.selectedLevel)   
  }

  ngOnInit(): void {
    this.personaService.getZona().subscribe(
      res => this.responseZona = res
    );

    this.awesomeForm = this.fb.group({
      nombre : ['your name', [Validators.required, Validators.minLength(4)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      f_nacimiento:['', [Validators.required]],
      cod_sector: ['', [Validators.required]],
      cod_zona: ['', [Validators.required]],
      sueldo: ['', [Validators.required]]
    });
  }

  guardarPersona() {
    this.personaService.addNewPerson(this.awesomeForm.value).subscribe(
      result => {
        console.log(result)
      }
    )
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Éxito!',
      html:'<p>Has guardado un nuevo registro</p>',
      showConfirmButton: false,
      timer: 2000
    })  
    // reseting form
    this.awesomeForm.reset();
  }

  selectedOption(){   
    this.zonas = [] 
    for(let x of this.responseZona) if(x.cod_sector == this.awesomeForm.get('cod_sector')?.value) this.zonas.push(x)    
    // console.log(this.awesomeForm.value)
    // console.log(e.target.value)
  }

}
