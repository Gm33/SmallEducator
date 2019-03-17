import { Component } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { TeacherProvider } from "../../../core/providers/teacher.provider";
import { Teacher } from "../../../core/interfaces/teacher";

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.less']
})
export class TeacherLoginComponent {

  // Indicates if the application is checking if the entered entry number is correct.
  // If loading no changes can be made to the entry number input field.
  isLoading = false;
  // If an incorrect entry number has been entered then it shows an error.
  inputError = false;
  // Input scope of the teacher's username and password.
  username = '';
  password = '';

  constructor(private teacherProvider: TeacherProvider,
              private message: NzMessageService,
              private router: Router) {
  }

  /**
   * Method which validates the given entry number and signs the user in (if it's valid).
   */
  login(): void {
    this.isLoading = true;
    if (!this.username.length || !this.password.length) {
      this.inputError = true;
      this.isLoading = false;
      return;
    }

    // Call the REST API using the Student provider.
    this.teacherProvider.signIn<Teacher>(this.username, this.password).subscribe(response => {
      // If valid student response then navigate to the secure screen.
      if (response.id) {
        console.log('Success!');
        this.router.navigate(['/courses']);
      } else {
        this.message.create('error', 'You\'ve entered an invalid username and/or password, please try again.');
      }
      this.isLoading = false;
    }, error => {
      // Something went wrong, which can be an internet connection problem or error code from API.
      this.isLoading = false;
      this.message.create('error', 'Something went wrong while logging in, please try again later.');
    });
  }

  /**
   * If the value changes if the number input then this method will be called.
   * The method will remove the error message when the user entered a 10 digit number.
   * @param entryNumber input from the input box.
   */
  onValueChange(entryNumber): void {
    if (this.inputError && this.username.length && this.password.length) {
      this.inputError = false;
    }
  }
}
