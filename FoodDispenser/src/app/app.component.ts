import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodDispenser';

  clickHandlerFullScreen(){
    let nav = document.getElementById("bigNav");
    nav.style.display="none";
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
                            (<any>elem).webkitRequestFullscreen || 
                            elem['mozRequestFullscreen'] ||
                            elem['msRequestFullscreen'];
        if (methodToBeInvoked){
          methodToBeInvoked.call(elem);
        }          
  }
}
