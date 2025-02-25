import ProfileLayout from "@/components/profile/ProfileLayout"
import PersonalInfo from "@/components/profile/PersonalInfo"

export default function PersonalInfoPage() {
  return (
    <ProfileLayout>
      <PersonalInfo /> {/* ✅ FIXED HERE */}
    </ProfileLayout>
  )
}
