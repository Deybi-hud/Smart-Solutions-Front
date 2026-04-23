import RegisterForm from "../components/organisms/RegisterForm";

const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <section className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Registrarse
                </h1>
                <RegisterForm />
            </section>
        </main>
    );
};

export default RegisterPage;