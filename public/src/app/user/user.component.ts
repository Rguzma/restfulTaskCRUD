import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
allTasks: any = []
task: any={}
singleTask: any = []



newTask:any={
  title:"",
  description:"",
  completed:false
};

  constructor( private _httpService: HttpService) { }
  ngOnInit(): void {
    console.log("init");
    let observable = this._httpService.getTasks();


    observable.subscribe(
       (data:any) =>{
         console.log("esto es data: "+data)
      this.allTasks = data

    },
    (error:any) =>{
      console.log("Something wet wrong ",error);
    })
    // console.log("After loading the tasks: ", this.taskslist);
  }


  getATask(_id:object):void{
    console.log("empieza func: "+_id);
    this.task=_id

    this._httpService.getATask(this.task)
    .subscribe((data: any) =>{
      console.log("este es getATask que regresa: "+data)
      this.singleTask=data
      console.log("data que regresa desde el service: "+data.title)
      console.log("data que regresa desde el singleTask: "+this.singleTask._id)

    });
  };

  createTask(event:any) :void{
    console.log("se crea el task")
    event.preventDefault()
    let observable=this._httpService.postCreateTask(this.newTask)
    console.log("aqui va new task: "+this.newTask)
    observable.subscribe(data =>{
      this.allTasks.push(data);
    })

  }

  deleteTask(_id:object):void{
    this.task = _id;
    console.log("task que se eliminara ", this.task);
    this._httpService.deleteTask(this.task)
    .subscribe((data:any) =>{ 
      console.log(data);
    });
    location.reload();
  }

  updateTask(_id:object, event:any): void{
    location.reload();
    this.task= _id
    let title= event.target.title.value;
    let description = event.target.description.value;
    let completed = event.target.completed.value;
    let updatedTask:any={
      title,
      description,
      completed
    };
    this._httpService.putUpdateTask(this.task, updatedTask)
    .subscribe((data:any) =>{
      console.log(data);
    });
  }


}