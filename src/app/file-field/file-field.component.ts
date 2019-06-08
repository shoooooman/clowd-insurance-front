import {AfterContentInit, Component, ContentChild, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FileInputDirective} from './directive/file-input.directive';
import {FileSrcDirective} from './directive/file-src.directive';

@Component({
    selector: 'app-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent implements OnInit, OnDestroy, AfterContentInit {
    @ContentChild(FileInputDirective) fileInputDirective: FileInputDirective;
    @ContentChild(FileSrcDirective) fileSrc: FileSrcDirective;
    @Output() fileInput = new EventEmitter<File>();
    subscription: Subscription;

    constructor() {
    }

    ngAfterContentInit(): void {
        this.subscription = this.fileInputDirective.fileInput.subscribe(file => {
            this.fileInput.emit(file);
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const url = e.target.result;
                this.fileSrc.setSrc(url);
            };
            reader.readAsDataURL(file);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {

    }
}
