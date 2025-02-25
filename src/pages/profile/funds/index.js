import ProfileLayout from "@/components/profile/ProfileLayout"
import FundDonations from "@/components/profile/FundDonations"

export default function PersonalInfoPage() {
  return (
    <ProfileLayout>
      <FundDonations /> {/* ✅ FIXED HERE */}
    </ProfileLayout>
  )
}
