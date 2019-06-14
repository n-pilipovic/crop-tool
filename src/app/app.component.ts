import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/api';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { Subscription } from 'rxjs';
import { ImageModel } from './model/image.model';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef<HTMLCanvasElement>;
  @ViewChild('cropResult', { static: true }) cropResult: ElementRef<HTMLImageElement>;

  public images: Array<ImageModel> = [];
  public imageCropSrc: string;

  private canvas: any;
  private context: CanvasRenderingContext2D;


  private canvasX: number;
  private canvasY: number;

  private lastMouseX: number;
  private lastMouseY: number;

  private mouseX: number;
  private mouseY: number;

  private canvasWidth: number;
  private canvasHeight: number;

  private mouseDown: boolean;

  private sub: Subscription = new Subscription();

  constructor(
    public dialogService: DialogService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.canvas = this.canvasElement.nativeElement;
    this.canvas.height = 430;
    this.canvas.width = 960;

    this.context = this.canvas.getContext('2d');
    console.log(this.context);

    this.canvasX = this.canvas.offsetLeft;
    this.canvasY = this.canvas.offsetTop;

    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.mouseDown = false;

    const img = new Image();
    img.src = 'assets/image/andy-yeung-walled-city-hong-kong.jpg';
    img.height = 430;
    img.width = 960;
    img.onload = () => { this.context.drawImage(img, 0, 0); };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  startRectangle(event: MouseEvent): void {
    this.lastMouseX = event.clientX - this.canvasX;
    this.lastMouseY = event.clientY - this.canvasY;
    this.mouseDown = true;
  }

  drawRectangle(event: MouseEvent): void {
    this.mouseX = event.clientX - this.canvasX;
    this.mouseY = event.clientY - this.canvasY;

    if (this.mouseDown) {
      this.context.beginPath();
      this.canvasWidth = this.mouseX - this.lastMouseX;
      this.canvasHeight = this.mouseY - this.lastMouseY;
      this.context.strokeStyle = 'green';
      this.context.lineWidth = 2;
    }
  }

  cropImage(event: MouseEvent): void {
    this.mouseDown = false;
    const ref = this.dialogService.open(TitleFormComponent, {
      header: 'Name selected image part',
      width: '70%',
      contentStyle: {'max-height': '350px', overflow: 'auto'}
    });

    const confirm = ref.onClose.subscribe((title: string) => {
      if (title) {
        const image: ImageModel = { title, image: this.getCropImageBase64()};

        // TODO: Crop the image and add it to list
        this.context.strokeRect(this.lastMouseX, this.lastMouseY, this.canvasWidth, this.canvasHeight);
        this.images.push(image);
      } else {
        this.resetPositions();
      }
    });

    this.sub.add(confirm);

  }

  saveImages(): void {
    this.dataService.saveImages(this.images).then(
      (resp) => {
        console.log(resp);
      }, err => {
        console.error(err);
      }
    );
  }

  private getCropImageBase64(): string {

    const tnCanvas = document.createElement('canvas');
    const tnCtx = tnCanvas.getContext('2d');
    tnCanvas.width = this.canvasWidth;
    tnCanvas.height = this.canvasHeight;


    tnCtx.drawImage(this.canvas, this.lastMouseX, this.lastMouseY, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight);

    const dataUrl = tnCanvas.toDataURL('base64', 1);

    this.imageCropSrc = dataUrl;

    const base64String = dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');

    return base64String;
  }

  private resetPositions(): void {
    this.mouseX = 0;
    this.mouseY = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }


}
