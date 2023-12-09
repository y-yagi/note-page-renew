import Link from "next/link";

const Signin = () => {
  return (
    <>
      <p>
        Please signed in. <Link href={"/auth"}>Sign in</Link>
      </p>
    </>
  );
};

export default Signin;
