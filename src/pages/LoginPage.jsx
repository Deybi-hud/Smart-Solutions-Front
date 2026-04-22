import LoginForm from "../components/organisms/LoginForm";

const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <section className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Iniciar sesión
                </h1>
                <LoginForm />
            </section>
        </main>
    );
};

export default LoginPage;