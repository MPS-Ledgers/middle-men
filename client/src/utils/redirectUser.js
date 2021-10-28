import { getAuth, onAuthStateChanged } from "firebase/auth";
import { history } from "../history";

const redirectUser = () => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			if (history.location.pathname === '/') history.replace('/user')
			return
		} else {
			// User is signed out
			if (history.location.pathname !== '/') history.replace('/')
			return
		}
	});
}
export default redirectUser;