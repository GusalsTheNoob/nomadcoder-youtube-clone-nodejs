import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"});
};

export const postJoin = async (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", {pageTitle: "Join", videos});
    } else {
        // To Do: Register User
        try {
            const user = User({
                name, email
            });
            await User.register(user, password);
        } catch (error) {
            console.log("Caught error in postJoin controller @ userController.js");
            console.log(error);
        }
        // To Do: Log user in
        res.redirect(routes.home);
    }
}


export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
export const postLogin = (req, res) => {
    // To Do: Process Log Out
  res.redirect(routes.home);
};
export const logout = (req, res) => res.render("logout");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");