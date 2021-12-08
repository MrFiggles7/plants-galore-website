class AlreadyLoggedIn extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "Already Logged In"; // (2)
    }
}

export default AlreadyLoggedIn
