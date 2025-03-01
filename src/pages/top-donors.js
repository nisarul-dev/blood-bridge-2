import dynamic from "next/dynamic";

const SignUpFormClientOnly = dynamic(() => import("@/components/TopDonorsPage"), {
  ssr: false, // Disable server-side rendering
});

export default function TopDonors() {
  return (
    <main>
      <SignUpFormClientOnly />
    </main>
  )
}

