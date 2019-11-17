import { Request, Response } from "express";
import User from "../models/user.model";
import {sample_users} from "../../api/samples_data"


export let addUser = (req: Request, res: Response) => {
    var user = new User(req.body);

    user.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  };

export let getUser = (req: Request, res: Response) => {

  // TO TEST
  var id:number = Number(req.params.userId)
  if (id>2){
    res.send("Error : to large id for test")
  }else{
    res.send(sample_users[id])
  }


  // FINAL VERSION
    // let user = User.findById(req.params.id, (err: any, user: any) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send(user);
    //   }
    // });


  };



  export let deleteUser = (req: Request, res: Response) => {
    let user = User.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted user "+req.params.id+" from db");
      }
    });
  };