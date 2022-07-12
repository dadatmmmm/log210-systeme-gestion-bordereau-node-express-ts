import md5 = require('md5');
import  { TeacherJSON, DecodeResult } from '.';
import { encodeSession } from '../jwt/Encode';
import { decodeSession } from '../jwt/Decode';
import { SECRET } from '../jwt/VeriyToken';

export class Teacher  {

  static login(email: string, password: string) {
    const teachers: TeacherJSON[] = require('../data/teachers.json');
    const teacher = teachers.find(teacher => email == teacher.id);
    const session = encodeSession(SECRET, {
      id: email,
      date: Date.now()
    });
    return teacher ? {  ...session, user: teacher } : null;
  }

  static fromToken(token: string):TeacherJSON {

    const decodeResults = decodeSession(SECRET, token);

    if (!decodeResults?.session) {
      throw new Error("Decoding did not work");
    }
    
    const teacher = Teacher.all().find(teacher => teacher.id == decodeResults.id);

    if (!teacher) {
      throw new Error("Teacher token not found");
    }

    return teacher;
  }
 
  static all() {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    return teachers;
  }
}
