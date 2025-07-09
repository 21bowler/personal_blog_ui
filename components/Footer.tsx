const Footer = () => {
  return (
    <footer className="container text-sm flex justify-center py-6 sm:py-10">
      <p>
        {' '}
        Copyright &copy; {new Date().getFullYear()} The DevLog. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
