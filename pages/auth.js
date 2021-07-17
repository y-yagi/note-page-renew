import FirebaseAuth from "../components/firebase-auth";

const Auth = () => {
  return (
    <div>
      <p>Please Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
