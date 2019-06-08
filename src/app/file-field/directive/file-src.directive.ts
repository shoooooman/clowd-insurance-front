import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[appFileSrc]'
})
export class FileSrcDirective {


    constructor(
        private renderer2: Renderer2,
        private elementRef: ElementRef
    ) { }

    @Input() set src(url: string) {
        this.setSrc(url);
    }

    setSrc(url: string) {
        this.renderer2.setAttribute(this.elementRef.nativeElement, 'src', url);
    }
}
