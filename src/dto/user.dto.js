class CreateUserDto {
    constructor({ username, email, password, phoneNumber, role }) {
      this.username = username; 
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.role = role;
    }
  }
  class UpdateUserDto {
    constructor({ username, email, password, phoneNumber, role }) {
      this.username = username; 
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.role = role;
    }
  }
  
  module.exports = { CreateUserDto, UpdateUserDto };
  