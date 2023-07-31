/**A tabela também foi recortada do código principal para um componente separado.
 * Na aula 118, em continuidade a ação para que a tabela receba os dados calculados
 * foi inserido o props dentro do parênteses da função do ResultsTable. 
 * Então, dentro do tbody, é criada uma função para receber dinâmicamente
 * as variáveis resultantes do calculateHandler, o props.data.map, portanto,
 * o props que é para passar de um componente para outro do mesmo nível,
 * o data é o nome do prop ciado no componente App e map para iterar por todos
 * os campos. Então o yearData, que é um nome criado ali para o atributo
 * para servir para passar os outros atributo abaixo e por fim o yearData.year
 * para incluir o campo year que é o mesmo nome que está no yearlyData no App.js
 * e assim para cada campo que deve ser mostrado. Sendo que para alguns, a lógica de cálculo
 * foi incluída dentro dele mesmo, o que me parece errado.
 * O método formatter é um método JS para formatar números, ele já veio no formato abaixo e depois
 * é passado dentro do campo que deve ser formatado.
 */
import classes from './ResultsTable.module.css';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
const ResultsTable = (props) => {
    return (
        <table className={classes.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((yearData) => (
            <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>{formatter.format(yearData.savingsEndOfYear -
             props.initialInvestment -
            yearData.yearlyContribution * yearData.year)}</td>
            <td>{formatter.format(props.initialInvestment + yearData.yearlyContribution * yearData.year)}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    )
};

export default ResultsTable;