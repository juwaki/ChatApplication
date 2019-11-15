import { Injectable } from '@angular/core';


//import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  var1$;
  var2$;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    // this.afAuth.authState.subscribe(auth => {
    //   if (auth !== undefined && auth !== null) {
    //     this.user = auth;
    //   }

    //   this.getUser().subscribe(a => {
    //     this.userName = a.displayName;
    //   });
    // });
  }

  // sendMessage(msg: string) {
  //   const timestamp = this.getTimeStamp();
  //   const email = 'test@codj.com';
  //   this.chatMessages = this.getMessages();
  //   this.chatMessages.push({
  //     message: msg,
  //     timeSent: timestamp,
  //     // userName: this.userName,
  //     userName: 'Juwaki',

  //     email: email,
  //   });

  //   console.log("send message");
  // }

  sendMessage(msg: string) {
    const timeStamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'user12@hdhdhd.com';
    
    this.chatMessages = this.getMessages();
    
    var message = {
      message: msg,
      timeSent: timeStamp,
      // userName: this.userName,
      userName: 'Juwaki Led',
      email: email,
    };
    const item = this.db.list('/messages');
    item.push(message);
  }
  // getMessages(): AngularFireObject<ChatMessage[]> {
  //   // query to create our message feed binding
  //   return this.db.list('messages', {
  //     query: {
  //       limitToLast: 25,
  //       orderByKey: true
  //     }
  //   });
  // }
  // getMessages(): AngularFireList<ChatMessage[]> {
  //   return this.db.list('messages', ref => {
  //     return ref.limitToLast(25);
  //   });
  // }

  getMessages(): AngularFireList<ChatMessage> {

    // query to create our message feed binding

    const itemsRef: AngularFireList<ChatMessage> = this.db.list('/messages');

    this.var1$ = itemsRef.snapshotChanges();

    this.var2$ = itemsRef.valueChanges();

    return this.var2$;

  } 


  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
