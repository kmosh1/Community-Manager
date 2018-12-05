CmuntyMngr.factory("userSrv", function ($q, $http) {

    var users = [];
    var userLoaded = false;
    var activeUser = null;
    // new User( {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // });
    function User(plainUser) {
        this.id = plainUser.id;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.pwd = plainUser.pwd;
        this.isCommittee = plainUser.isCommittee;
        this.address = plainUser.address;
        this.appartment = plainUser.appartment;
    }

    function login(email, pwd) {
        var async = $q.defer();

        var loginURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/users?email=" +
            email + "&pwd=" + pwd;
        $http.get(loginURL).then(function (response) {
            if (response.data.length > 0) {
                // success login
                activeUser = new User(response.data[0]);
                async.resolve(activeUser);
            } else {
                // invalid email or password
                async.reject("invalid email or password")
            }
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }

    function getUsers() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all users only once.
        if (userLoaded) {
            async.resolve(users);
        } else {
            users = [];
            var getUserssURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/users";
            
            $http.get(getUserssURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var user = new User(response.data[i]);
                    users.push(user);
                }
                userLoaded = true;
                async.resolve(users);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function isCommittee() {
        var currentUser = getActiveUser();
        return activeUser.isCommittee ? true : false;
    }

    function getUser(userId) {
        for (var i in users) {
            if (users[i].id === userId) {
                return users[i];
            }
        }
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        isCommittee: isCommittee,
        logout: logout,
        getActiveUser: getActiveUser,
        getUser: getUser,
        getUsers: getUsers
    }
})