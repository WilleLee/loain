import { signup } from "@libs/actions";

export default function AuthSignupPage() {
  return (
    <form action={signup}>
      <button type="submit">signup</button>
    </form>
  );
}
