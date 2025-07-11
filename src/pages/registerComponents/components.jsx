export const Input = ({classesStr, placeholder }) => (
  <input className={classesStr} placeholder={placeholder} />);

export const Button = ({ text, onClick }) => (
  <button className="cardBtn" onClick={onClick}>{text}</button>);