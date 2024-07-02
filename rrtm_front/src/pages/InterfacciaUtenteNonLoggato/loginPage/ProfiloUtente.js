class ProfiloUtente {
    username;
    userImage;
    status;
    role;

    constructor(username, userImage, role) {
        this.username = username;
        this.userImage = userImage;
        this.status = "logged";
        this.role=role;
    }

    getUsername() {
        return this.username
    }
    getUserImage() {
        return this.userImage;
    }
    getStatus() {
        return this.status
    }
    getRole() {
        return this.role;
    }

    setUsername(username) {
        this.username=username;
    }
    setUserImage(userImage) {
        this.userImage=userImage;
    }
    setStatus(status) {
        this.status=status;
    }
    setRole(role) {
        this.role=role;
    }
}

export default ProfiloUtente;
