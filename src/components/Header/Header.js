/**Segundo, é criada essa sintaxe padrão para o componente, com const
 * nome do componente, a arrow function, dentro do return o componente
 * e o export no final.
 * Assim, no App.js foi importado o Header e reincluído dentro do return
 * Também foi necessário incluir aqui o import do logo, mas modificando o caminho
 */
import logo from "../../assets/investment-calculator-logo.png";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>
    )
};

export default Header;