import dynamic from "next/dynamic";

const SignUpFormClientOnly = dynamic(() => import("@/components/SignUpForm"), {
  ssr: false, // Disable server-side rendering
});

export default function SignUp() {
  return (
    <main>
      <SignUpFormClientOnly />
    </main>
  )
}

