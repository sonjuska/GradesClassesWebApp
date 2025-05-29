import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{
ngOnInit(): void {
  
}
@Input() control!: FormControl;                    
}
