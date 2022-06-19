export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.auth.role != "Researcher") {
    return redirect('/auth/sign-in')
  }
}