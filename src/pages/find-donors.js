import dynamic from "next/dynamic";

const SignUpFormClientOnly = dynamic(() => import("@/components/FindDonorsPage"), {
  ssr: false, // Disable server-side rendering
});

export default function FindDonors() {
  return (
    <main>
      <SignUpFormClientOnly />
    </main>
  )
}

