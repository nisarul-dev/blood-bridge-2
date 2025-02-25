import ProfileLayout from "@/components/profile/ProfileLayout"
import RecentDonations from "@/components/profile/RecentDonations"

export default function PersonalInfoPage() {
  return (
    <ProfileLayout>
      <RecentDonations /> {/* ✅ FIXED HERE */}
    </ProfileLayout>
  )
}
