export class AuthenticationResponse {
    jwt: string;
    constructor(jwt: string) {
        this.jwt = jwt;
    }
}
