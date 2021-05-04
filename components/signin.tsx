import Link from "next/link";

const Signin = () => {
  return (
    <>
      <p>
        Please signed in.{" "}
        <Link href={"/auth"}>
          <a>Sign in</a>
        </Link>
      </p>
    </>
  );
};

export default Signin;
