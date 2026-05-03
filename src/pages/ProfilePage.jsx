import NavBar from "../components/organisms/NavBar";
import UserProfile from "../components/organisms/UserProfile";

const ProfilePage = () => {
    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-gray-950 py-8 sm:py-12 px-4">
                <UserProfile />
            </main>
        </>
    );
};

export default ProfilePage;
