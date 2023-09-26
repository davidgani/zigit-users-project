export default class FormValidator {
    static isValidEmail(email: string): boolean {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    }

    static isValidPassword(password: string) : boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
        return passwordRegex.test(password);
    }
  }