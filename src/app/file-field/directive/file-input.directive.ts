import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appFileInput]'
})
export class FileInputDirective {


    @Output() fileInput = new EventEmitter<File>();

    constructor() { }

    @HostListener('input', ['$event'])
    onInput(event) {
        if (event.target.files) {
            this.fileInput.emit(event.target.files[0]);
        }
    }


}
