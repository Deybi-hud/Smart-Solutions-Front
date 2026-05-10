const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 mt-auto">
      <div className="max-w-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} hola soy un footer:3</p>
      </div>
    </footer>
  );
};

export default Footer;
