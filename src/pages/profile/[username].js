import { useRouter } from 'next/router';
import ProfileLayout from "@/components/profile/ProfileLayout";
import dynamic from 'next/dynamic';

const PersonalInfoClientOnly = dynamic(() => import("@/components/profile/PersonalInfo"), {
  ssr: false, // Disable server-side rendering
});

export default function PersonalInfoPage() {
    const router = useRouter();
    const { username } = router.query;

    if (!username) {
        return null; // Wait until username is available
    }

    return (
        <ProfileLayout>
            <PersonalInfoClientOnly customUser={username} />
        </ProfileLayout>
    );
}
