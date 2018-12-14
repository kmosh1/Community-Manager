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
    function user(plainUser) {
        this.id = plainUser.id;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.pwd = plainUser.pwd;
        this.phone = plainUser.phone;
        this.isCommittee = plainUser.isCommittee;
        this.address = plainUser.address;
        this.appartment = plainUser.appartment;
        this.image = plainUser.image;
    }

    function login(email, pwd) {
        var async = $q.defer();

        // if working with real server:
        //         var loginURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/users?email=" +
        //         email + "&pwd=" + pwd;
        //     $http.get(loginURL).then(function (response) {
        //         if (response.data.length > 0) {
        //             // success login
        //             activeUser = new user(response.data[0]);
        //             async.resolve(activeUser);
        //         } else {
        //             // invalid email or password
        //             async.reject("invalid email or password")
        //         }
        //     }, function (error) {
        //         async.reject(error);
        //     });
        // }

        for (var i in users) {
            if (users[i].email === email && users[i].pwd === pwd) {
                activeUser = users[i];
                async.resolve(activeUser);
            }
        }
        if (activeUser == null) {
            async.reject("invalid email or password")
        }

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

            $http.get(getUserssURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var newUser = new user(response.data[i]);
                    users.push(newUser);
                }
                userLoaded = true;
                async.resolve(users);
            }, function (error) {
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
        return (currentUser.isCommittee ==="Yes") ? true : false;
    }


    function addUser(fname, lname, email, pwd, address, phone, isCommittee, appartment, image) {
        var async = $q.defer();

        var newUser = new user({
            id: users[users.length - 1].id + 1, fname: fname, lname: lname, email: email, pwd: pwd,
            phone: phone, isCommittee: isCommittee, address: address, appartment: appartment, image: image
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/users", newUser).then.....

        users.push(newUser);
        activeUser = newUser;
        async.resolve(newUser);

        return async.promise;
    }

    function editUser(user, pwd) {

        var async = $q.defer();
        userIndex = users.indexOf(user);

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/users", findUser).then.....
        users[userIndex].fname = user.fname;
        users[userIndex].lname = user.lname;
        users[userIndex].email = user.email;
        users[userIndex].pwd = pwd;
        users[userIndex].phone = user.phone;
        users[userIndex].isCommittee = user.isCommittee;
        users[userIndex].appartment = user.appartment;
        users[userIndex].image = user.image;
        async.resolve(true);

        return async.promise;
    }

    function DeleteUser(user) {
        var async = $q.defer();
        userIndex = users.indexOf(user);

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/users", deleteUser).then.....



        users.splice(userIndex,1)  ;      
   
        async.resolve("Tenant Deleted Successfully");

        return async.promise;
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
        DeleteUser: DeleteUser,
        getUser: getUser,
        getUsers: getUsers,
        addUser: addUser,
        editUser: editUser
    }
})