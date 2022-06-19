export default function ({ store, redirect }) {
  // If the user is not authenticated

  if (store.state.auth.role != "Organizer") {
    return redirect('/auth/sign-in')
  }
}