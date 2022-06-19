export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.auth.auth_user != "Participant") {
    return redirect('/auth/sign-in')
  }
}