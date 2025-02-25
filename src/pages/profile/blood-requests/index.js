import ProfileLayout from "@/components/profile/ProfileLayout"
import BloodRequests from "@/components/profile/BloodRequests"

export default function PersonalInfoPage() {
  return (
    <ProfileLayout>
      <BloodRequests /> {/* ✅ FIXED HERE */}
    </ProfileLayout>
  )
}
