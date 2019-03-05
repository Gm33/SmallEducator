import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../core/providers/student.provider";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.less']
})
export class StudentLoginComponent {

  // Indicates if the application is checking if the entered entry number is correct.
  // If loading no changes can be made to the entry number input field.
  isLoading;
  // If an incorrect entry number has been entered then it shows an error.
  inputError = false;
  // Input scope of the entry number.
  entryNumber = '';

  constructor(private studentProvider: StudentProvider,
              private message: NzMessageService,
              private router: Router) {
  }

  /**
   * Method which validates the given entry number and signs the user in (if it's valid).
   */
  login(): void {
    this.isLoading = true;
    if (!this.isValidEntryNumber(this.entryNumber)) {
      this.inputError = true;
      this.isLoading = false;
      return;
    }

    // Call the REST API using the Student provider.
    this.studentProvider.signInWithEntryNumber(this.entryNumber).subscribe(response => {
      // If valid student response then navigate to the secure screen.
      if (response.firstName) {
        this.router.navigate(['/course']);
      } else {
        this.message.create('error', 'You\'ve entered an incorrect entry number, please try again.');
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
    if (this.inputError && this.isValidEntryNumber(entryNumber)) {
      this.inputError = false;
    }
  }

  /**
   * Validates if the given en number is 10 digits only.
   * @param entryNumber
   * @returns {boolean}
   */
  isValidEntryNumber(entryNumber): boolean {
    return entryNumber && entryNumber.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/); //  && entryNumber.match(/^\d{10}$/);
  }
}
