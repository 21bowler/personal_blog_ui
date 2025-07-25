const Footer = () => {
  return (
    <footer className="container text-xs flex text-gray-950 justify-center py-2 sm:py-10 sm:text-sm">
      <p>
        {' '}
        Copyright &copy; {new Date().getFullYear()} The DevLog. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
