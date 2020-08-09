import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface IOptions {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<IOptions>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" name={name} id={name} {...rest}>
        <option
          value=""
          disabled
          hidden
        >Selecione uma opção</option>
        
        {options.map((option) => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
};

export default Select;
