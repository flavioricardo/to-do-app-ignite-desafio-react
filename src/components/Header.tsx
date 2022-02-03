import "../styles/header.scss";
const isDevelopment = process.env.NODE_ENV !== "production";

export function Header() {
  return (
    <header className="header">
      <div>
        <img
          src={
            isDevelopment
              ? "/logo.svg"
              : "/ignite-desafio-conceitos-do-react/logo.svg"
          }
          alt="to.do"
        />
      </div>
    </header>
  );
}
