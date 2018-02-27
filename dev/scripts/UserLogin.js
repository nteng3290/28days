import React from 'react';

class UserLogin extends React.Component {
    constructor(){
        super();
        this.state ={
            loggedin: "false", 
            user: {}  
        }
        this.userSettings =this.userSettings.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.createUser = this.createUser.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                    this.setState({
                        loggedIn: true
                    });
            }
            else {
                this.setState({
                    loggedIn: false,
                    user: {}
                });
            }
        })
    }
    userSettings(e){
        console.log("Clicked");
        e.preventDefault();
        this.dropDown.classList.toggle('show');
    }
    showCreate(e) {
        e.preventDefault();
        this.overlay.classList.toggle('show');
        this.createUserModal.classList.toggle('show');
        // this.userSettings(e);
    }
    createUser(e){
        e.preventDefault();
        //Check the passwords if they match
        //Are at least 6 characters
        const email = this.createEmail.value;
        const password = this.createPassword.value;
        const confirm = this.confirmPassword.value;
        if (password === confirm){
        firebase.auth()
            .createUserWithEmailAndPassword(email,password)
            .then((res) => {
            this.showCreate(e);
            })
            .catch((err) => {
            alert(err.message)
            })
        }
        else {
        alert("Passwords much match")
        }
    }
    showLogin(e){
        e.preventDefault();
        this.overlay.classList.toggle('show');
        this.loginModal.classList.toggle('show');
        // this.userSettings(e);
    }
    loginUser(e){
        e.preventDefault();
        const email = this.userEmail.value;
        const password = this.userPassword.value;
        firebase.auth()
        .signInWithEmailAndPassword(email,password)
        .then((res) => {
            this.showLogin(e);
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    signInGoogle(e) {
        console.log("Signing In")
        e.preventDefault();
        // new is a constructor
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        });
        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log(user);
            })
        this.showCreate(e);
        this.showLogin(e);        
    }
    signOut(e){
        e.preventDefault();
        console.log("is this working?");
        firebase.auth().signOut();

        this.setState({
            loggedIn: false
        })
        // this.userSettings(e);
    }
    render(){
        return(
            <div className="user">
                <div className="overlay" ref={ref => this.overlay = ref}></div>    
                <div className="userDropdown">
                    {this.state.loggedIn ?
                        <button className="signout" onClick={this.signOut}>Sign Out</button>
                        :
                        <div className="userInfo">
                            <button className="userSet" onClick={this.showLogin}><i className="fas fa-user"></i>Create User</button>
                        </div>
                    }
                </div>         
                <div className="loginModal modal" ref={ref => this.loginModal = ref}>
                    <div className="closeButton" onClick={this.showLogin}>
                        <i className="fa fa-times"></i>
                    </div>
                    <form action="" onSubmit={this.loginUser}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" ref={ref => this.userEmail = ref} />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" ref={ref => this.userPassword = ref} />
                        </div>
                        <div>
                            <input type="submit" value="Login" />
                        </div>
                        <button id="loginGoogle" onClick={this.signInGoogle}><i className="fab fa-google"></i>Sign in with Google</button>
                        <button className="createAccount" onClick={this.showCreate}>Create Account</button>
                    </form>
                </div>
                <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                    <div className="closeButton" onClick={this.showCreate}>
                        <i className="fa fa-times"></i>
                    </div>
                    <form action="" onSubmit={this.createUser}>
                        <div>
                            <label htmlFor="createEmail">Email:</label>
                            <input type="text" name="createEmail" ref={ref => this.createEmail = ref} />
                        </div>
                        <div>
                            <label htmlFor="createPassword">Create Password:</label>
                            <input type="password" name="createPassword" ref={ref => this.createPassword = ref} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
                        </div>
                        <div>
                            <input type="submit" value="Create" onClick={this.createUser} />
                        </div>
                        <button id="signInGoogle" onClick={this.signInGoogle}><i className="fab fa-google"></i>Sign in with Google</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserLogin;