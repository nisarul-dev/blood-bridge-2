import dynamic from "next/dynamic"
import ProfileLayout from "@/components/profile/ProfileLayout"

const PersonalInfoClientOnly = dynamic(() => import("@/components/profile/PersonalInfo"), {
  ssr: false, // Disable server-side rendering
});

export default function PersonalInfoPage() {
  return (
    <ProfileLayout>
      <PersonalInfoClientOnly customUser={undefined}/> {/* ✅ FIXED HERE */}
    </ProfileLayout>
  )
}
